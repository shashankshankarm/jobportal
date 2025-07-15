from flask import Flask, request, jsonify
import pdfplumber
import nltk
import re
import os
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer, util

# Ensure NLTK data is available
nltk.download('punkt')
nltk.download('stopwords')

# Initialize app
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

# Load Sentence Transformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ''
    return text

# Preprocess text: tokenize, lower, remove stopwords
def preprocess_text(text):
    stop_words = set(stopwords.words('english'))
    tokens = word_tokenize(text.lower())
    words = [word for word in tokens if word.isalpha() and word not in stop_words]
    return ' '.join(words)

@app.route('/rank', methods=['POST'])
def rank_resumes():
    if 'job_description' not in request.form:
        return jsonify({'error': 'Missing job_description'}), 400

    job_description = request.form['job_description']
    job_description_clean = preprocess_text(job_description)
    
    if 'resumes' not in request.files:
        return jsonify({'error': 'No resumes uploaded'}), 400

    resumes = request.files.getlist('resumes')
    results = []

    for resume in resumes:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], resume.filename)
        resume.save(file_path)

        resume_text = extract_text_from_pdf(file_path)
        resume_clean = preprocess_text(resume_text)

        # Use SentenceTransformer similarity
        jd_embedding = model.encode(job_description_clean, convert_to_tensor=True)
        resume_embedding = model.encode(resume_clean, convert_to_tensor=True)
        score = util.cos_sim(jd_embedding, resume_embedding).item()

        results.append({
            'filename': resume.filename,
            'similarity_score': round(score, 4)
        })

        os.remove(file_path)

    results = sorted(results, key=lambda x: x['similarity_score'], reverse=True)
    return jsonify(results)

if __name__ == '__main__':
    if not os.path.exists('uploads'):
        os.makedirs('uploads')
    app.run(debug=True)

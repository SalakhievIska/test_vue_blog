import os
import uuid

from flask import Flask, request, jsonify, send_from_directory, make_response
from flask_cors import CORS
from werkzeug.utils import secure_filename

DEBUG = True

UPLOAD_FOLDER = 'uploads-photo'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config.from_object(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['GET', 'POST'])
def upload():
    response_object = {'status': 'success'}
    if request.method == 'POST':
        file = request.files['file']
        filename = str(uuid.uuid4()) + '.' + file.filename.split('.')[-1]

        if not os.path.exists(app.config['UPLOAD_FOLDER']):
            os.mkdir(app.config['UPLOAD_FOLDER'])

        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        response_object['photoUrl'] = f'http://localhost:5000/getPhoto/{filename}'

        response = make_response(jsonify(response_object), 200)
        response.headers['Content-Type'] = 'application/json'
    return response


@app.route('/getPhoto/<filename>', methods=['GET'])
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'],
                               filename)


@app.route('/removePhoto/<filename>', methods=['GET'])
def removed_file(filename):
    os.remove(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return jsonify({'status': 'success'})


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
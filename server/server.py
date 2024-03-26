from flask import Flask, request, jsonify
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, storage

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize Firebase Admin SDK
cred = credentials.Certificate("server\imageinfy-firebase-adminsdk-xntvf-9c7ea66f64.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'imageinfy.appspot.com'
})
bucket = storage.bucket()

@app.route('/data', methods=['POST'])
def receive_data():
    user_data = request.json  # Get JSON data sent from frontend
    # Assuming 'uid' is the key to identify the user
    # if 'uid' in user_data:
    #     uid = user_data['uid']
    #     images = fetch_images_for_user(uid)
    #     return uid
    return user_data

def fetch_images_for_user(uid):
    # # Construct a reference to the user's images folder in Firebase Storage
    # user_images_ref = bucket.child(f'users/{uid}/images')

    # # List all objects (images) in the user's images folder
    # blobs = user_images_ref.list_blobs()

    # # Extract URLs of all images
    # image_urls = [blob.public_url for blob in blobs]

    # return {'images': image_urls}
    pass

if __name__ == '__main__':
    app.run(debug=True)

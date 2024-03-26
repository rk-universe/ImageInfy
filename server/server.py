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
bucket = storage.bucket()  # This line is correct

@app.route('/data', methods=['POST'])
def get_images():
    user_data = request.json  # Get JSON data sent from frontend
    user_uid = user_data.get('user', {}).get('uid')  # Accessing nested 'uid' field
    # Specify the path to the user's folder in Firebase Storage
    user_folder_path = f"{user_uid}/image/1711486472516"  # Example path, adjust as per your storage structure
    print(user_folder_path)
    blobs = bucket.list_blobs(prefix=user_folder_path)
    print(blobs)
    # Iterate through the blobs to fetch all images
    image_urls = []
    for blob in blobs:
        if blob.name.endswith('.jpg') or blob.name.endswith('.jpeg') or blob.name.endswith('.png'):
            # Download the image to a local file (optional)
            local_image_filename = f"temp/{blob.name.split('/')[-1]}"
            blob.download_to_filename(local_image_filename)

            # Add the URL of the image to the list
            image_urls.append({'filename': blob.name.split('/')[-1], 'url': f"/image/{user_uid}/{blob.name.split('/')[-1]}"})

    # Return the list of image URLs
    return {'images': image_urls}
if __name__ == '__main__':
    app.run(debug=True)
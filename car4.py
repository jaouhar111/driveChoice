import http.client
import urllib.parse
import json
import random
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK
cred = credentials.Certificate("serviceAccountKey.json")  # Path to your Firebase service account key
firebase_admin.initialize_app(cred)
db = firestore.client()

# Array of car brands
brands = [
    "Aston Martin", "BMW",   "Alfa Romeo", 
    "Chrysler", "Dodge", "Fiat", "Jeep", "Ferrari", "Ford", 
    "HONDA",  "HYUNDAI", "Jaguar", "Land Rover", 
    "Range Rover", "KIA",  "Maserati", "MAZDA", 
    "Mercedes_Benz", "MITSUBISHI", "INFINITI", "NISSAN", 
     "Porsche",  "Rolls Royce",  
     "TOYOTA", "Audi", "Bentley", "BUGATTI", 
    "Lamborghini", "Volkswagen", "Volvo"
]

# API connection details
api_host = "cars-by-api-ninjas.p.rapidapi.com"
api_key = "883d1d0f9cmsh25610fa4fb5840ep17b9eajsn5d8236a14e31"
headers = {
    'x-rapidapi-key': api_key,
    'x-rapidapi-host': api_host
}

# Number of results per request
limit_per_request = 30
total_results_needed = 10

# Imagin Studio API Customer Key (replace with your actual key)
customer_key = "hrjavascript-mastery"

# Function to generate random prices in MAD
def generate_random_price():
    return f"{random.randint(200000, 1500000)} DH"  # Prices between 200,000 MAD and 1,500,000 MAD

# Function to construct the image URL
def construct_image_url(make, model_family, model_range, model_variant):
    base_url = "https://cdn.imagin.studio/getImage?"
    query_params = {
        "customer": customer_key,
        "make": make,
        "modelFamily": model_family,
        "modelRange": model_range,
        "modelVariant": model_variant,
        "zoomtype": "relative"
    }
    return base_url + urllib.parse.urlencode(query_params)

# Function to store data in Firebase
def store_in_firebase(brand, car_data):
    for car in car_data:
        # Construct the image URL
        image_url = construct_image_url(
            make=car.get('make', brand),
            model_family=car.get('model', 'Unknown'),
            model_range=car.get('model', 'Unknown'),
            model_variant=car.get('model', 'Unknown')
        )
        
        # Store each car's data in the Firestore database
        db.collection('cars').add({
            'brand': brand,
            'model': car.get('model', 'Unknown'),
            'year': car.get('year', 'Unknown'),
            'price': car.get('price', generate_random_price()),
            'image_url': image_url,
            'other_details': car
        })

# Iterate through each brand and call the API
for brand in brands:
    make = urllib.parse.quote(brand)  # Encode the brand name for URL
    
    all_car_data = []  # To store all results for the current brand
    
    for offset in range(0, total_results_needed, limit_per_request):
        # Establish a new connection for each request
        conn = http.client.HTTPSConnection(api_host)
        
        # Prepare the API request with pagination
        api_endpoint = f"/v1/cars?make={make}&year=2024&limit={limit_per_request}&offset={offset}"
        conn.request("GET", api_endpoint, headers=headers)
        
        # Get the response
        res = conn.getresponse()
        data = res.read().decode("utf-8")
        
        # Parse the JSON data
        car_data = json.loads(data)
        
        # Add a random price to each car entry
        for car in car_data:
            car['price'] = generate_random_price()
        
        # Add the fetched data to the list
        all_car_data.extend(car_data)
        
        # Close the connection after the request
        conn.close()
        
        # Stop if we have fetched enough results
        if len(all_car_data) >= total_results_needed:
            break
    
    # Store the data in Firebase
    store_in_firebase(brand, all_car_data[:total_results_needed])
    
    # Print confirmation
    print(f"Stored data for {brand} in Firebase.")

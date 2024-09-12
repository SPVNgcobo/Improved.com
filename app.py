from flask import Flask, request, jsonify
import csv

app = Flask(__name__)

@app.route('/save_cart', methods=['POST'])
def save_cart():
    cart_items = request.json.get('cartItems', [])
    with open('cart.csv', mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Product', 'Price', 'Quantity', 'Total'])
        for item in cart_items:
            writer.writerow([item['name'], item['price'], item['quantity'], item['total']])
    
    return jsonify({'message': 'Cart saved successfully!'}), 200

if __name__ == '__main__':
    app.run(debug=True)

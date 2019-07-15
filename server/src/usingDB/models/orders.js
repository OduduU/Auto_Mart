
const orderResponse = {    
    // generate response,   
    create(order) {        
        let response = {
            status: 200,
            data: {
                id: order.id,
                created_on: order.created_on,
                buyer: order.buyer,
                car_id: order.car_id,
                price: order.price,
                price_offered: order.price_offered,
                quantity: order.quantity,
                status: order.status,
            }
        }
        return response;
    }
}

export default orderResponse;
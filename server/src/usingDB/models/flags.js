
const reportResponse = {
    create(flag) {
        let response = {
            status: 200,
            data: [
                {
                id: flag.id,
                car_id: flag.car_id,
                reason: flag.reason,
                description: flag.description,
                }
            ]
        }
        return response;
    }

}


export default reportResponse;
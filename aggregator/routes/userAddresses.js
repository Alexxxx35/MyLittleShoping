const router = require("express").Router();
const axios = require('axios');

const roads = {
    //USER MICROSERVICE
    USER_ADDRESSES_URL: "http://localhost:5002/api/userAddresses",
    USER_ADDRESS_URL: "http://localhost:5002/api/userAddress"
}

// CONSULT ALL USER ADDRESSES
router.get("/userAddresses", async (request, response) => {
    try {
        const addresses = await axios.get(roads.USER_ADDRESSES_URL, {
            headers: {
                'Authorization': request.headers.authorization
            }
        });
        return response.status(addresses.status).json({
            "response": addresses.data.response
        });
    }
    catch (error) { console.log(error) }
})

// CONSULT A USER ADDRESS
router.get("/userAddress", async (request, response) => {
    if (!request.query.address1) {
        return response.status(400).json({
            "response": "Bad request format",
        });
    }
    const address = await axios.get(roads.USER_ADDRESS_URL, {
        headers: {
            'Authorization': request.headers.authorization
        },
        params: {
            address1: request.query.address1
        }
    });
    return response.status(address.status).json({
        "response": address.data.response
    });
});

//CREATE A USER ADDRESS
router.post("/userAddress", async (request, response) => {
    if (!request.body.address1 || !request.body.address2 || !request.body.address3 || !request.body.city || !request.body.region || !request.body.country || !request.body.postalCode) {
        return response.status(400).json({
            "response": "Bad request format",
        });
    }
    try {
        const newAddress = await axios.post(roads.USER_ADDRESS_URL, {
            headers: {
                'Authorization': request.headers.authorization
            },
            address1: request.body.address1,
            address2: request.body.address2,
            address3: request.body.address3,
            city: request.body.city,
            region: request.body.region,
            country: request.body.country,
            postalCode: request.body.postalCode
        });
        return response.status(newAddress.status).json({
            "response": newAddress.data.response
        });
    } catch (error) {
        response.status(error.response.status).json({
            "response": error.response.data.response
        });
    }

});

//MODIFY A USER ADDRESS
router.put("/userAddress", async (request, response) => {
    if (!request.body.address1) {
        return response.status(400).json({
            "response": "Bad request format",
        });
    }
    try {
        const userAddressToUpdate = await axios.put(roads.USER_ADDRESS_URL, request.body, {
            headers: {
                'Authorization': request.headers.authorization
            },
        }
        );
        return response.status(userAddressToUpdate.status).json({
            "response": userAddressToUpdate.data.response
        });

    } catch (error) {
        response.status(error.response.status).json({
            "response": error.response.data.response
        });
    }
});

//DELETE A USER ADDRESS
router.delete("/userAddress", async (request, response) => {
    if (!request.body.address1) {
        return response.status(400).json({
            "response": "Bad request format",
        });
    }
    try {
        const userAddressToDelete = await axios.delete(roads.USER_ADDRESS_URL, {
            headers: {
                'Authorization': request.headers.authorization
            },
            data: request.body
        });
        return response.status(userAddressToDelete.status).json({
            "response": userAddressToDelete.data.response
        });
    } catch (error) {
        response.status(error.response.status).json({
            "response": error.response.data.response
        });
    }
});


module.exports = router;
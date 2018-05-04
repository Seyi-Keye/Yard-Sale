import model from './models';
const Product = model.Product;
const cartItemModel = model.cartItems;
const orderItemModel = model.orderItems;

class Raffle {
  constructor(socket,productId, avaliableQty, yardsaleId) {
    this.socket = socket;
    this.productId = productId;
    this.avaliableQty = avaliableQty;
    this.leftOver = avaliableQty;
    this.yardsaleId = yardsaleId;
    this.createRequestObject();
  }

  // method to create RequestObject for the product
  createRequestObject() {
    let requests = [];
    cartItemModel.findall({
      where: {
        productId: this.productId
      }
    })
    .then((requests) => {
      this.createRequestObject = requests;
      this.startRaffle();
    })
    .catch((err) => {
      // emit error to admin
      
    });
  }


  // method to start the raffle
  startRaffle() {
    while( this.leftOver > 0) {
      let requestsLen = this.createRequestObject.length;
      // when we have enough for every one
      if ( this.leftOver >= requestsLen) {
        // we assign an item to each user
        let selectedRequest = {};
        for(var i=0; i < requestsLen; i++){
            selectedRequest = this.createRequestObject[i];
            this.assignProduct(selectedRequest, index)
        }
      } else {
         const randomIndex = Math.floor(Math.random() * requestsLen) + 1;
         this.assignProduct(this.createRequestObject[randomIndex], randomIndex);
      }
    }

    if ( this.leftOver === 0) {
      this.closeRaffle();
    }
  }

  // method to assign a single product to a user
  assignProduct(selectedRequest, index) {
    this.removeRequestItem(selectedRequestindex);
    this.addToUserOrder(selectedRequest);
  }

  // method a single item from the user wish  list
  removeRequestItem(selectedRequestindex) {
    this.leftOver -= 1;
    this.createRequestObject[selectedRequestindex].unassignedQuantity -= 1;
    // remove object if the unassignedQuantity is equal to zero
    if (this.createRequestObject[selectedRequestindex].unassignedQuantity === 0) {
      this.createRequestObject.splice(selectedRequestindex, 1);
    }
  }
  // method to add a produc to a users order
  addToUserOrder(selectedRequest){
    orderItemModel
    .findone({
      where: {
        userId: selectedRequest.userId,
        productId: this.productId
      }
    })
    .then((orderItem) => {
      if(orderItem) {
        orderItem
        .update({
          quantity: (orderItem.quantity+1),
          cost: (selectedRequest.price * (orderItem.quantity+1)),
        })
        .then(() => {
          this.socket.emit('raffleWinner', {
             user: selectedRequest.userEmail,
             productId: this.productId 
            });

        })
      } else {
        // create a new orderitem
        const orderItemObject = {
          "userId": selectedRequest.userId,
          "productId": this.productId,
          "quantity": 1,
          "yardsaleId": this.yardsaleId,
          "cost": selectedRequest.price,
          "price": selectedRequest.price,
        }

        orderItemModel
        .create(orderItemObject)
        .then(() => {
          this.socket.emit('raffleWinner', {
            user: selectedRequest.userEmail,
            productId: this.productId 
           });
        })

      }
    })
  }

  closeRaffle() {
    product
    .findById(this.productId)
    .then((product) => {
      if (!product) {
        // raise exception
      }
      product
      .update({
        leftOver: this.leftOver
      })
      .then(() => {
        this.socket.emit('end-product-raffle', {
          yardsaleId: this.yardsaleId ,
          productId: this.productId
         });
      })
    })
    .catch(error => res.status(500).send(error));

    // TODO: update the user cartItem
  }
}

module.exports = Raffle;

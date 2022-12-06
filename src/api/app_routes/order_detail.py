import tempfile
from api.models import db, User, OrderDetail, Product, Order
from api.utils import generate_sitemap, APIException
from flask import Flask, Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity

app = Flask(__name__)
jwt = JWTManager(app)

apiOrderDetail = Blueprint("apiOrderDetail", __name__)


@apiOrderDetail.route("/orders_detail", methods=["GET"])
@jwt_required()
def get_orders_Detail():
    user = User.query.get(get_jwt_identity())
    orders = Order.query.filter_by(user_id=user.id).all()
    all_orders_detail = []
    for i in orders:
        orders_detail = OrderDetail.query.filter_by(order_id=i.id).all()
        orders_detail = list(map(lambda order_detail: order_detail.serialize(), orders_detail))
        all_orders_detail.append(orders_detail)

    return jsonify(all_orders_detail), 200


@apiOrderDetail.route("/order_detail/<order_detail_id>", methods=["GET"])
def get_order_Detail(order_detail_id):

    order_detail = OrderDetail.query.get(order_detail_id)

    if isinstance(order_detail, OrderDetail):
        return jsonify(order_detail.serialize()), 200
    else:
        return jsonify({"messsage": "order detail not found"})


""" @apiOrderDetail.route('/order_detail/', methods=['POST'])
#@jwt_required()
def register_order_detail():
    
    order_detail = OrderDetail()
    body = request.json
    for x in body:
        if type(x) == 'dict':
            for i in x:
                order_detail.price = i["price"]
                order_detail.quantity = i["quantity"]
                order_detail.product_id = i["id"]
        else: order_detail.order_id = x['order_id']
    
    #print(order_detail.order_id)
    #print(type(x))

    try:
        db.session.add(order_detail)
        db.session.commit()
        return jsonify(order_detail.serialize()), 201
    except Exception as error:
        print(error)
        db.session.rollback()
        return jsonify({"message":"something went wrong registering the order detail"}), 400
 """


@apiOrderDetail.route("/order_detail/<order_detail_id>", methods=["PUT"])
def update_order_detail(order_detail_id):

    body = request.json
    order_detail = OrderDetail.query.get(order_detail_id)

    order_detail.price = body["price"]
    order_detail.quantity = body["quantity"]

    try:
        db.session.add(order_detail)
        db.session.commit()
        return jsonify(order_detail.serialize()), 201
    except Exception as error:
        print(error)
        db.session.rollback()
        return jsonify({"message": "something went wrong updating this order detail"}), 400


@apiOrderDetail.route("/order_detail/<order_detail_id>", methods=["DELETE"])
def delete_order_detail(order_detail_id):

    order_detail = OrderDetail.query.get(order_detail_id)

    if order_detail:
        db.session.delete(order_detail)
        try:
            db.session.commit()
            return jsonify({"message": "order detail deleted successfully"}), 200
        except Exception as error:
            print(error)
            db.session.rollback()
            return jsonify({"message": "order detail doesn't exist"}), 400

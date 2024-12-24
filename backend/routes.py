from flask import Blueprint, jsonify, request
from backend.models import Cliente, Proveedor, Ingeniero, Sucursal, Usuario, Ticket, BitacoraTicket, Facturacion
from backend.extensions import db

api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/clientes', methods=['GET'])
def get_clientes():
    clientes = Cliente.query.all()
    return jsonify([cliente._asdict() for cliente in clientes])

@api_blueprint.route('/proveedores', methods=['GET'])
def get_proveedores():
    proveedores = Proveedor.query.all()
    return jsonify([proveedor._asdict() for proveedor in proveedores])

@api_blueprint.route('/ingenieros', methods=['GET'])
def get_ingenieros():
    ingenieros = Ingeniero.query.all()
    return jsonify([ingeniero._asdict() for ingeniero in ingenieros])

@api_blueprint.route('/sucursales', methods=['GET'])
def get_sucursales():
    sucursales = Sucursal.query.all()
    return jsonify([sucursal._asdict() for sucursal in sucursales])

@api_blueprint.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = Usuario.query.all()
    return jsonify([usuario._asdict() for usuario in usuarios])

@api_blueprint.route('/tickets', methods=['GET'])
def get_tickets():
    tickets = Ticket.query.all()
    return jsonify([ticket._asdict() for ticket in tickets])

@api_blueprint.route('/bitacora-tickets', methods=['GET'])
def get_bitacora_tickets():
    bitacora_tickets = BitacoraTicket.query.all()
    return jsonify([bitacora_ticket._asdict() for bitacora_ticket in bitacora_tickets])

@api_blueprint.route('/facturaciones', methods=['GET'])
def get_facturaciones():
    facturaciones = Facturacion.query.all()
    return jsonify([facturacion._asdict() for facturacion in facturaciones])
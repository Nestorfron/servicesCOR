from flask import Blueprint, jsonify, request
from backend.models import Customer, Provider, Engineer, Branch, User, Ticket, History_ticket, Invoice
from backend.extensions import db
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash


api = Blueprint('api', __name__)




"""ENDPOINTS REGISTER AND LOGIN"""

@api.route('/master_signup', methods=['POST'])
def master_signup():
    body = request.json
    name = body.get('name')
    email = body.get('email')
    password = body.get('password')
    if name is None or email is None or password is None:
        return jsonify({'message': 'Missing parameters'}), 400
    
    password_hash = generate_password_hash(password)

    try:
        user = User(name=name, email=email, password=password_hash, role='master')
        db.session.add(user)
        db.session.commit()
        return jsonify(user.serialize())
    except Exception as e:
        return jsonify({'message': str(e)}), 500


@api.route('/signup', methods=['POST'])
def signup():
    body = request.json
    name = body.get('name', None)
    email = body.get('email', None)
    password = body.get('password', None)
    role = body.get('role', None)
    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'Email already exists'}), 400
    if User.query.filter_by(name=name).first():
        return jsonify({'message': 'Name already exists'}), 400
    if email is None or password is None or name is None or role is None:
        return jsonify({'message': 'Missing parameters'}), 400
    
    password_hash = generate_password_hash(password)

    try:
        user = User(name=name, email=email, password=password_hash, role=role)
        db.session.add(user)
        db.session.commit()
        access_token = create_access_token(identity=user.id)
        return jsonify({'access_token': access_token}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    

@api.route('/login', methods=['POST'])
def login():
    body = request.json
    email = body.get('email', None)
    password = body.get('password', None)
    if email is None or password is None:
        return jsonify({'message': 'Missing parameters'}), 400
    user = User.query.filter_by(email=email).first()    
    if user is None:
        user = Engineer.query.filter_by(email=email).first()
        if user is None:
            return jsonify({'message': 'Invalid email or password'}), 400
    if not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid email or password'}), 400
    access_token = create_access_token({'id': user.id, 'role': user.role, 'name': user.name, 'email': user.email})
    return jsonify({'token': access_token}), 200
   

"""ENDPOINTS GETS"""

@api.route('/users', methods=['GET'])
@jwt_required()

def get_all_users():
    users = User.query.order_by(User.id.asc()).all()
    users_data = [user.serialize() for user in users]
    return jsonify({"users": users_data}), 200

@api.route('/customers', methods=['GET'])
@jwt_required()

def get_customers():
    customers = Customer.query.order_by(Customer.id.asc()).all()
    customers_data = [customer.serialize() for customer in customers]
    return jsonify({"customers": customers_data}), 200

@api.route('/providers', methods=['GET'])
@jwt_required()

def get_providers():
    providers = Provider.query.order_by(Provider.id.asc()).all()
    providers_data = [provider.serialize() for provider in providers]
    return jsonify({"providers": providers_data}), 200

@api.route('/engineers', methods=['GET'])
@jwt_required()

def get_engineers():
    engineers = Engineer.query.order_by(Engineer.id.asc()).all()
    engineers_data = [engineer.serialize() for engineer in engineers]
    return jsonify({"engineers": engineers_data}), 200

@api.route('/branches', methods=['GET'])
@jwt_required()

def get_branches():
    branches = Branch.query.order_by(Branch.id.asc()).all()
    branches_data = [branch.serialize() for branch in branches]
    return jsonify({"branches": branches_data}), 200

@api.route('/tickets', methods=['GET'])
@jwt_required()

def get_tickets():
    tickets = Ticket.query.order_by(Ticket.id.asc()).all()
    tickets_data = [ticket.serialize() for ticket in tickets]
    return jsonify({"tickets": tickets_data}), 200

@api.route('/history_tickets', methods=['GET'])
@jwt_required()

def get_history_tickets():
    history_tickets = History_ticket.query.order_by(History_ticket.id.asc()).all()
    history_tickets_data = [history_ticket.serialize() for history_ticket in history_tickets]
    return jsonify({"history_tickets": history_tickets_data}), 200

@api.route('/invoices', methods=['GET'])
@jwt_required()

def get_invoices():
    invoices = Invoice.query.order_by(Invoice.id.asc()).all()
    invoices_data = [invoice.serialize() for invoice in invoices]
    return jsonify({"invoices": invoices_data}), 200

    
"""ENDPOINTS POSTS"""

@api.route('/new_customer', methods=['POST'])
def new_customer():
    body=request.json
    name = body.get('name', None)
    address = body.get('address', None)
    contact_person = body.get('contact_person', None)
    email = body.get('email', None)
    phone_number = body.get('phone_number', None)
    if name is None or address is None or contact_person is None or email is None or phone_number is None:
        return jsonify({'message': 'Missing parameters'}), 400
    try:   
        new_customer = Customer(name=name, address=address, contact_person=contact_person, email=email, phone_number=phone_number)
        db.session.add(new_customer)
        db.session.commit()
        return jsonify({"new_customer": new_customer.serialize()}), 201
    except Exception as error:
        return jsonify({'message': f"{error}"}), 500
    
@api.route('/new_provider', methods=['POST'])
def new_provider():
    body=request.json
    company_name = body.get('company_name', None)
    contact_person = body.get('contact_person', None)
    email = body.get('email', None)
    phone_number = body.get('phone_number', None)
    state = body.get('state', None)
    zone = body.get('zone', None)
    if company_name is None or contact_person is None or email is None or phone_number is None or state is None or zone is None:
        return jsonify({'message': 'Missing parameters'}), 400
    try:   
        new_provider = Provider(company_name=company_name, contact_person=contact_person, email=email, phone_number=phone_number, state=state, zone=zone)
        db.session.add(new_provider)
        db.session.commit()
        return jsonify({"new_provider": new_provider.serialize()}), 201
    except Exception as error:
        return jsonify({'message': f"{error}"}), 500
    
@api.route('/new_engineer', methods=['POST'])
def new_engineer():
    body=request.json
    provider_id = body.get('provider_id', None)
    name = body.get('name', None)
    email = body.get('email', None)
    password = body.get('password', None)
    phone_number = body.get('phone_number', None)
    if name is None or email is None or phone_number is None or password is None:
        return jsonify({'message': 'Missing parameters'}), 400
    password_hash = generate_password_hash(password)
    try:   
        new_engineer = Engineer(provider_id=provider_id, name=name, email=email, phone_number=phone_number, password=password_hash)
        db.session.add(new_engineer)
        db.session.commit()
        return jsonify({"new_engineer": new_engineer.serialize()}), 201
    except Exception as error:
        return jsonify({'message': f"{error}"}), 500
    
@api.route('/new_branch', methods=['POST'])
def new_branch():
    body=request.json
    customer_id = body.get('customer_id', None)
    name = body.get('name', None)
    address = body.get('address', None)
    if customer_id is None or name is None or address is None:
        return jsonify({'message': 'Missing parameters'}), 400
    try:   
        new_branch = Branch(customer_id=customer_id, name=name, address=address)
        db.session.add(new_branch)
        db.session.commit()
        return jsonify({"new_branch": new_branch.serialize()}), 201
    except Exception as error:
        return jsonify({'message': f"{error}"}), 500
    
@api.route('/new_user', methods=['POST'])
def new_user():
    body=request.json
    name = body.get('name', None)
    email = body.get('email', None)
    password = body.get('password', None)
    if name is None or email is None or password is None:
        return jsonify({'message': 'Missing parameters'}), 400
    try:   
        new_user = User(name=name, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"new_user": new_user.serialize()}), 201
    except Exception as error:
        return jsonify({'message': f"{error}"}), 500
    
@api.route('/new_ticket', methods=['POST'])
def new_ticket():
    body=request.json
    customer_id = body.get('customer_id', None)
    provider_id = body.get('provider_id', None)
    engineer_id = body.get('engineer_id', None)
    branch_id = body.get('branch_id', None)
    activity = body.get('activity', None)
    status = body.get('status', None)
    created_at = body.get('created_at', None)
    updated_at = body.get('updated_at', None)
    completed_at = body.get('completed_at', None)
    return_process = body.get('return_process', None)
    billing_status = body.get('billing_status', None)
    payment_status = body.get('payment_status', None)
    if customer_id is None or provider_id is None or engineer_id is None or branch_id is None or activity is None or status is None or created_at is None or updated_at is None or completed_at is None or return_process is None or billing_status is None or payment_status is None:
        return jsonify({'message': 'Missing parameters'}), 400
    try:   
        new_ticket = Ticket(customer_id=customer_id, provider_id=provider_id, engineer_id=engineer_id, branch_id=branch_id, activity=activity, status=status, created_at=created_at, updated_at=updated_at, completed_at=completed_at, return_process=return_process, billing_status=billing_status, payment_status=payment_status)
        db.session.add(new_ticket)
        db.session.commit()
        return jsonify({"new_ticket": new_ticket.serialize()}), 201
    except Exception as error:
        return jsonify({'message': f"{error}"}), 500
    
@api.route('/new_history_ticket', methods=['POST'])
def new_history_ticket():
    body=request.json
    ticket_id = body.get('ticket_id', None)
    user_id = body.get('user_id', None)
    comment = body.get('comment', None)
    created_at = body.get('created_at', None)
    if ticket_id is None or user_id is None or comment is None or created_at is None:
        return jsonify({'message': 'Missing parameters'}), 400
    try:   
        new_history_ticket = History_ticket(ticket_id=ticket_id, user_id=user_id, comment=comment, created_at=created_at)
        db.session.add(new_history_ticket)
        db.session.commit()
        return jsonify({"new_history_ticket": new_history_ticket.serialize()}), 201
    except Exception as error:
        return jsonify({'message': f"{error}"}), 500
    
@api.route('/new_invoice', methods=['POST'])
def new_invoice():
    body=request.json
    ticket_id = body.get('ticket_id', None)
    amount = body.get('amount', None)
    status = body.get('status', None)
    invoice_date = body.get('invoice_date', None)
    payment_date = body.get('payment_date', None)
    if ticket_id is None or amount is None or status is None or invoice_date is None or payment_date is None:
        return jsonify({'message': 'Missing parameters'}), 400
    try:   
        new_invoice = Invoice(ticket_id=ticket_id, amount=amount, status=status, invoice_date=invoice_date, payment_date=payment_date)
        db.session.add(new_invoice)
        db.session.commit()
        return jsonify({"new_invoice": new_invoice.serialize()}), 201
    except Exception as error:
        return jsonify({'message': f"{error}"}), 500
    

"""ENDPOINTS EDITS"""

@api.route('/customers/<int:id>', methods=['PUT'])
def edit_customer(id):
    body = request.json
    name = body.get('name')
    address = body.get('address')
    contact_person = body.get('contact_person')
    email = body.get('email')
    phone_number = body.get('phone_number')
    if name is None or address is None or contact_person is None or email is None or phone_number is None:
        return jsonify({'message': 'Missing parameters'}), 400
    try:
        customer = Customer.query.get(id)
        customer.name = name
        customer.address = address
        customer.contact_person = contact_person
        customer.email = email
        customer.phone_number = phone_number
        db.session.commit()
        return jsonify(customer.serialize())
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@api.route('/providers/<int:id>', methods=['PUT'])
def edit_provider(id):
    body = request.json
    company_name = body.get('company_name')
    contact_person = body.get('contact_person')
    email = body.get('email')
    phone_number = body.get('phone_number')
    state = body.get('state')
    zone = body.get('zone')
    if company_name is None or contact_person is None or email is None or phone_number is None or state is None or zone is None:
        return jsonify({'message': 'Missing parameters'}), 400
    try:
        provider = Provider.query.get(id)
        provider.company_name = company_name
        provider.contact_person = contact_person
        provider.email = email
        provider.phone_number = phone_number
        provider.state = state
        provider.zone = zone
        db.session.commit()
        return jsonify(provider.serialize())
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@api.route('/engineers/<int:id>', methods=['PUT'])
def edit_engineer(id):
    body = request.json
    provider_id = body.get('provider_id')
    name = body.get('name')
    email = body.get('email')
    phone_number = body.get('phone_number')
    if provider_id is None or name is None or email is None or phone_number is None:
        return jsonify({'message': 'Missing parameters'}), 400
    try:
        engineer = engineer.query.get(id)
        engineer.provider_id = provider_id
        engineer.name = name
        engineer.email = email
        engineer.phone_number = phone_number
        db.session.commit()
        return jsonify(engineer.serialize())
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@api.route('/branches/<int:id>', methods=['PUT'])
def edit_branch(id):
    body = request.json
    customer_id = body.get('customer_id')
    name = body.get('name')
    address = body.get('address')
    if customer_id is None or name is None or address is None:
        return jsonify({'message': 'Missing parameters'}), 400
    try:
        branch = Branch.query.get(id)
        branch.customer_id = customer_id
        branch.name = name
        branch.address = address
        db.session.commit()
        return jsonify(branch.serialize())
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@api.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    body = request.json
    name = body.get('name')
    email = body.get('email')
    password = body.get('password')
    if name is None or email is None or password is None:
        return jsonify({'message': 'Missing parameters'}), 400
    try:
        user = User.query.get(id)
        user.name = name
        user.email = email
        user.password = password
        db.session.commit()
        return jsonify(user.serialize())
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@api.route('/tickets/<int:id>', methods=['PUT'])
def update_ticket(id):
    body = request.json
    customer_id = body.get('customer_id')
    provider_id = body.get('provider_id')
    engineer_id = body.get('engineer_id')
    branch_id = body.get('branch_id')
    activity = body.get('activity')
    status = body.get('status')
    created_at = body.get('created_at')
    updated_at = body.get('updated_at')
    completed_at = body.get('completed_at')
    return_process = body.get('return_process')
    billing_status = body.get('billing_status')
    payment_status = body.get('payment_status')
    if customer_id is None or provider_id is None or engineer_id is None or branch_id is None or activity is None or status is None or created_at is None or updated_at is None or completed_at is None or return_process is None or billing_status is None or payment_status is None:
        return jsonify({'message': 'Missing parameters'}), 400
    try:
        ticket = Ticket.query.get(id)
        ticket.customer_id = customer_id
        ticket.provider_id = provider_id
        ticket.engineer_id = engineer_id
        ticket.branch_id = branch_id
        ticket.activity = activity
        ticket.status = status
        ticket.created_at = created_at
        ticket.updated_at = updated_at
        ticket.completed_at = completed_at
        ticket.return_process = return_process
        ticket.billing_status = billing_status
        ticket.payment_status = payment_status
        db.session.commit()
        return jsonify(ticket.serialize())
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@api.route('/history_tickets/<int:id>', methods=['PUT'])
def update_history_ticket(id):
    body = request.json
    ticket_id = body.get('ticket_id')
    user_id = body.get('user_id')
    comment = body.get('comment')
    created_at = body.get('created_at')
    if ticket_id is None or user_id is None or comment is None or created_at is None:
        return jsonify({'message': 'Missing parameters'}), 400
    try:
        history_ticket = History_ticket.query.get(id)
        history_ticket.ticket_id = ticket_id
        history_ticket.user_id = user_id
        history_ticket.comment = comment
        history_ticket.created_at = created_at
        db.session.commit()
        return jsonify(history_ticket.serialize())
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@api.route('/invoices/<int:id>', methods=['PUT'])
def update_invoice(id):
    body = request.json
    ticket_id = body.get('ticket_id')
    amount = body.get('amount')
    status = body.get('status')
    invoice_date = body.get('invoice_date')
    payment_date = body.get('payment_date')
    if ticket_id is None or amount is None or status is None or invoice_date is None or payment_date is None:
        return jsonify({'message': 'Missing parameters'}), 400
    try:
        invoice = Invoice.query.get(id)
        invoice.ticket_id = ticket_id
        invoice.amount = amount
        invoice.status = status
        invoice.invoice_date = invoice_date
        invoice.payment_date = payment_date
        db.session.commit()
        return jsonify(invoice.serialize())
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    

"""ENDPOINTS DELETES"""

@api.route('/customers/<int:id>', methods=['DELETE'])
def delete_customer(id):
    try:
        customer = Customer.query.get(id)
        db.session.delete(customer)
        db.session.commit()
        return jsonify({'message': 'Customer deleted'})
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@api.route('/providers/<int:id>', methods=['DELETE'])
def delete_provider(id):
    try:
        provider = Provider.query.get(id)
        db.session.delete(provider)
        db.session.commit()
        return jsonify({'message': 'Provider deleted'})
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@api.route('/engineers/<int:id>', methods=['DELETE'])
def delete_engineer(id):
    try:
        engineer = engineer.query.get(id)
        db.session.delete(engineer)
        db.session.commit()
        return jsonify({'message': 'engineer deleted'})
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@api.route('/branches/<int:id>', methods=['DELETE'])
def delete_branch(id):
    try:
        branch = Branch.query.get(id)
        db.session.delete(branch)
        db.session.commit()
        return jsonify({'message': 'Branch deleted'})
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@api.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    try:
        user = User.query.get(id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted'})
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@api.route('/tickets/<int:id>', methods=['DELETE'])
def delete_ticket(id):
    try:
        ticket = Ticket.query.get(id)
        db.session.delete(ticket)
        db.session.commit()
        return jsonify({'message': 'Ticket deleted'})
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@api.route('/history_tickets/<int:id>', methods=['DELETE'])
def delete_history_ticket(id):
    try:
        history_ticket = History_ticket.query.get(id)
        db.session.delete(history_ticket)
        db.session.commit()
        return jsonify({'message': 'History ticket deleted'})
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@api.route('/invoices/<int:id>', methods=['DELETE'])
def delete_invoice(id):
    try:
        invoice = Invoice.query.get(id)
        db.session.delete(invoice)
        db.session.commit()
        return jsonify({'message': 'invoice deleted'})
    except Exception as e:
        return jsonify({'message': str(e)}), 500
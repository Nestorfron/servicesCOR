from backend.extensions import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=True)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=True)

    def __repr__(self):
        return f'<User {self.name}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role
        }
    
class Customer(db.Model):
    __tablename__ = 'customers'

    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.Text, nullable=True)
    contact_person = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(255), unique=True, nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)
    is_active = db.Column(db.Boolean, nullable=True, default=True)

    def __repr__(self):
        return f'<Customer {self.name}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'contact_person': self.contact_person,
            'email': self.email,
            'phone_number': self.phone_number,
            'is_active': self.is_active
        }


class Provider(db.Model):
    __tablename__ = 'providers'

    id = db.Column(db.BigInteger, primary_key=True)
    company_name = db.Column(db.String(255), nullable=False)
    contact_person = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(255), unique=True, nullable=True)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)
    state = db.Column(db.String(100), nullable=True)
    zone = db.Column(db.String(100), nullable=True)
    is_active = db.Column(db.Boolean, nullable=True, default=True)

    engineers = db.relationship('Engineer', backref=db.backref('provider'))
    tickets = db.relationship('Ticket', backref=db.backref('provider_tikets'))

    def __repr__(self):
        return f'<Provider {self.company_name}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'company_name': self.company_name,
            'contact_person': self.contact_person,
            'email': self.email,
            'role': self.role,
            'phone_number': self.phone_number,
            'state': self.state,
            'zone': self.zone,
            'is_active': self.is_active,
            'engineers': [engineer.serialize() for engineer in self.engineers],
            'tickets': [ticket.serialize() for ticket in self.tickets]
        }


class Engineer(db.Model):
    __tablename__ = 'engineers'

    id = db.Column(db.BigInteger, primary_key=True)
    
    provider_id = db.Column(db.BigInteger, db.ForeignKey('providers.id'), nullable=False, index=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=True)
    password = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(20), nullable=True)

    def __repr__(self):
        return f'<Engineer {self.name}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'provider_id': self.provider_id,
            'name': self.name,
            'email': self.email,
            'phone_number': self.phone_number
        }


class Branch(db.Model):
    __tablename__ = 'branches'

    id = db.Column(db.BigInteger, primary_key=True)
    customer_id = db.Column(db.BigInteger, db.ForeignKey('customers.id'), nullable=False, index=True)

    name = db.Column(db.String(255), nullable=False)
    Social_Registration = db.Column(db.BigInteger, nullable=True)
    address = db.Column(db.Text, nullable=True)
    colony = db.Column(db.String(100), nullable=True)
    postal_code = db.Column(db.String(100), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    municipality = db.Column(db.String(100), nullable=True)
    state = db.Column(db.String(100), nullable=True)
    contact_1 = db.Column(db.String(100), nullable=True)
    phone_1 = db.Column(db.String(100), nullable=True)
    contact_2 = db.Column(db.String(100), nullable=True)
    phone_2 = db.Column(db.String(100), nullable=True)
    email = db.Column(db.String(100), nullable=True)
    schredule = db.Column(db.String(100), nullable=True)

    customer = db.relationship('Customer', backref=db.backref('branches', lazy='dynamic'))

    def __repr__(self):
        return f'<Branch {self.name}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'name': self.name,
            'Social_Registration': self.Social_Registration,
            'address': self.address,
            'colony': self.colony,
            'postal_code': self.postal_code,
            'city': self.city,
            'municipality': self.municipality,
            'state': self.state,
            'contact_1': self.contact_1,
            'phone_1': self.phone_1,
            'contact_2': self.contact_2,
            'phone_2': self.phone_2,
            'email': self.email,
            'schredule': self.schredule
        }



class Ticket(db.Model):
    __tablename__ = 'tickets'

    id = db.Column(db.BigInteger, primary_key=True)


    customer_id = db.Column(db.BigInteger, db.ForeignKey('customers.id'), nullable=False, index=True)


    provider_id = db.Column(db.BigInteger, db.ForeignKey('providers.id'), nullable=False, index=True)
    engineer_id = db.Column(db.BigInteger, db.ForeignKey('engineers.id'), nullable=False, index=True)
    branch_id = db.Column(db.BigInteger, db.ForeignKey('branches.id'), nullable=False, index=True)


    folio = db.Column(db.BigInteger, nullable=True)
    folio_TIB = db.Column(db.BigInteger, nullable=True)
    Social_Registration = db.Column(db.BigInteger, nullable=True)
    address = db.Column(db.Text, nullable=True)
    colony = db.Column(db.String(100), nullable=True)
    postal_code = db.Column(db.String(100), nullable=True)
    city = db.Column(db.String(100), nullable=True)
    municipality = db.Column(db.String(100), nullable=True)
    state = db.Column(db.String(100), nullable=True)
    contact_1 = db.Column(db.String(100), nullable=True)
    phone_1 = db.Column(db.String(100), nullable=True)
    contact_2 = db.Column(db.String(100), nullable=True)
    phone_2 = db.Column(db.String(100), nullable=True)
    email = db.Column(db.String(100), nullable=True)
    service = db.Column(db.String(100), nullable=True)

    status = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())
    completed_at = db.Column(db.DateTime, nullable=True)
    return_process = db.Column(db.Boolean, default=False)
    billing_status = db.Column(db.String(20), nullable=False)
    payment_status = db.Column(db.String(20), nullable=False)


    customer = db.relationship('Customer', backref=db.backref('tickets', lazy='dynamic'))
    engineer = db.relationship('Engineer', backref=db.backref('tickets', lazy='dynamic'))
    branch = db.relationship('Branch', backref=db.backref('tickets', lazy='dynamic'))


    def __repr__(self):
        return f'<Ticket {self.id}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'folio': self.folio,
            'folio_TIB': self.folio_TIB,
            'Social_Registration': self.Social_Registration,
            'address': self.address,
            'colony': self.colony,
            'postal_code': self.postal_code,
            'city': self.city,
            'municipality': self.municipality,
            'state': self.state,
            'contact_1': self.contact_1,
            'phone_1': self.phone_1,
            'contact_2': self.contact_2,
            'phone_2': self.phone_2,
            'email': self.email,
            'service': self.service,
        }


class History_ticket(db.Model):
    __tablename__ = 'history_tickets'

    id = db.Column(db.BigInteger, primary_key=True)
    ticket_id = db.Column(db.BigInteger, db.ForeignKey('tickets.id'), nullable=False, index=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey('users.id'), nullable=False, index=True)
    comment = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=db.func.now())

    ticket = db.relationship('Ticket', backref=db.backref('history_tickets', lazy='dynamic'))
    user = db.relationship('User', backref=db.backref('history_tickets', lazy='dynamic'))

    def __repr__(self):
        return f'<History_ticket {self.id}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'ticket_id': self.ticket_id,
            'user_id': self.user_id,
            'comment': self.comment,
            'created_at': self.created_at
        }


class Invoice(db.Model):
    __tablename__ = 'invoices'

    id = db.Column(db.BigInteger, primary_key=True)

    ticket_id = db.Column(db.BigInteger, db.ForeignKey('tickets.id'), nullable=False, index=True)


    amount = db.Column(db.Numeric, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    invoice_date = db.Column(db.Date, nullable=True)
    payment_date = db.Column(db.Date, nullable=True)

    ticket = db.relationship('Ticket', backref=db.backref('invoices', lazy='dynamic'))

    def __repr__(self):
        return f'<Invoice {self.id}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'ticket_id': self.ticket_id,
            'amount': self.amount,
            'status': self.status,
            'invoice_date': self.invoice_date,
            'payment_date': self.payment_date
        }

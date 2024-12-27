from backend.extensions import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=True)
    password = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(50), nullable=True)

    def __repr__(self):
        return f'<Usuario {self.name}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role
        }
    
class Client(db.Model):
    __tablename__ = 'clients'

    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.Text, nullable=True)
    contact_person = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(255), unique=True, nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)

    def __repr__(self):
        return f'<Client {self.name}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'address': self.address,
            'contact_person': self.contact_person,
            'email': self.email,
            'phone_number': self.phone_number
        }


class Provider(db.Model):
    __tablename__ = 'providers'

    id = db.Column(db.BigInteger, primary_key=True)
    company_name = db.Column(db.String(255), nullable=False)
    contact_person = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(255), unique=True, nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)
    state = db.Column(db.String(100), nullable=True)
    zone = db.Column(db.String(100), nullable=True)

    def __repr__(self):
        return f'<Provider {self.company_name}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'company_name': self.company_name,
            'contact_person': self.contact_person,
            'email': self.email,
            'phone_number': self.phone_number,
            'state': self.state,
            'zone': self.zone
        }


class Ingenier(db.Model):
    __tablename__ = 'ingeniers'

    id = db.Column(db.BigInteger, primary_key=True)


    provider_id = db.Column(db.BigInteger, db.ForeignKey('providers.id'), nullable=False, index=True)


    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)

    provider = db.relationship('Provider', backref=db.backref('ingeniers', lazy='dynamic'))

    def __repr__(self):
        return f'<Ingeniero {self.name}>'
    
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
    client_id = db.Column(db.BigInteger, db.ForeignKey('clients.id'), nullable=False, index=True)

    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.Text, nullable=True)

    client = db.relationship('Client', backref=db.backref('branches', lazy='dynamic'))

    def __repr__(self):
        return f'<Sucursal {self.name}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'client_id': self.client_id,
            'name': self.name,
            'address': self.address
        }



class Ticket(db.Model):
    __tablename__ = 'tickets'

    id = db.Column(db.BigInteger, primary_key=True)


    client_id = db.Column(db.BigInteger, db.ForeignKey('clients.id'), nullable=False, index=True)


    provider_id = db.Column(db.BigInteger, db.ForeignKey('providers.id'), nullable=False, index=True)
    engineer_id = db.Column(db.BigInteger, db.ForeignKey('ingeniers.id'), nullable=False, index=True)
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


    client = db.relationship('Client', backref=db.backref('tickets', lazy='dynamic'))
    provider = db.relationship('Provider', backref=db.backref('tickets', lazy='dynamic'))
    engineer = db.relationship('Ingenier', backref=db.backref('tickets', lazy='dynamic'))
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


class Facture(db.Model):
    __tablename__ = 'factures'

    id = db.Column(db.BigInteger, primary_key=True)

    ticket_id = db.Column(db.BigInteger, db.ForeignKey('tickets.id'), nullable=False, index=True)


    amount = db.Column(db.Numeric, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    invoice_date = db.Column(db.Date, nullable=True)
    payment_date = db.Column(db.Date, nullable=True)

    ticket = db.relationship('Ticket', backref=db.backref('factures', lazy='dynamic'))

    def __repr__(self):
        return f'<Facture {self.id}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'ticket_id': self.ticket_id,
            'amount': self.amount,
            'status': self.status,
            'invoice_date': self.invoice_date,
            'payment_date': self.payment_date
        }

from backend.extensions import db

class Cliente(db.Model):
    """Modelo que representa a los clientes."""
    __tablename__ = 'clientes'

    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.Text, nullable=True)
    contact_person = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(255), unique=True, nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)

    def __repr__(self):
        return f'<Cliente {self.name}>'


class Proveedor(db.Model):
    """Modelo que representa a los proveedores."""
    __tablename__ = 'proveedores'

    id = db.Column(db.BigInteger, primary_key=True)
    company_name = db.Column(db.String(255), nullable=False)
    contact_person = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(255), unique=True, nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)
    state = db.Column(db.String(100), nullable=True)
    zone = db.Column(db.String(100), nullable=True)

    def __repr__(self):
        return f'<Proveedor {self.company_name}>'


class Ingeniero(db.Model):
    """Modelo que representa a los ingenieros asociados a proveedores."""
    __tablename__ = 'ingenieros'

    id = db.Column(db.BigInteger, primary_key=True)
    provider_id = db.Column(db.BigInteger, db.ForeignKey('proveedores.id'), nullable=False, index=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=True)
    phone_number = db.Column(db.String(20), nullable=True)

    provider = db.relationship('Proveedor', backref=db.backref('ingenieros', lazy='dynamic'))

    def __repr__(self):
        return f'<Ingeniero {self.name}>'


class Sucursal(db.Model):
    """Modelo que representa las sucursales asociadas a clientes."""
    __tablename__ = 'sucursales'

    id = db.Column(db.BigInteger, primary_key=True)
    client_id = db.Column(db.BigInteger, db.ForeignKey('clientes.id'), nullable=False, index=True)
    name = db.Column(db.String(255), nullable=False)
    address = db.Column(db.Text, nullable=True)

    client = db.relationship('Cliente', backref=db.backref('sucursales', lazy='dynamic'))

    def __repr__(self):
        return f'<Sucursal {self.name}>'


class Usuario(db.Model):
    """Modelo que representa a los usuarios del sistema."""
    __tablename__ = 'usuarios'

    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=True)
    role = db.Column(db.String(50), nullable=True)

    def __repr__(self):
        return f'<Usuario {self.name}>'


class Ticket(db.Model):
    """Modelo que representa los tickets de servicio."""
    __tablename__ = 'tickets'

    id = db.Column(db.BigInteger, primary_key=True)
    client_id = db.Column(db.BigInteger, db.ForeignKey('clientes.id'), nullable=False, index=True)
    provider_id = db.Column(db.BigInteger, db.ForeignKey('proveedores.id'), nullable=False, index=True)
    engineer_id = db.Column(db.BigInteger, db.ForeignKey('ingenieros.id'), nullable=False, index=True)
    branch_id = db.Column(db.BigInteger, db.ForeignKey('sucursales.id'), nullable=False, index=True)
    activity = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())
    updated_at = db.Column(db.DateTime, default=db.func.now(), onupdate=db.func.now())
    completed_at = db.Column(db.DateTime, nullable=True)
    return_process = db.Column(db.Boolean, default=False)
    billing_status = db.Column(db.String(20), nullable=False)
    payment_status = db.Column(db.String(20), nullable=False)

    client = db.relationship('Cliente', backref=db.backref('tickets', lazy='dynamic'))
    provider = db.relationship('Proveedor', backref=db.backref('tickets', lazy='dynamic'))
    engineer = db.relationship('Ingeniero', backref=db.backref('tickets', lazy='dynamic'))
    branch = db.relationship('Sucursal', backref=db.backref('tickets', lazy='dynamic'))

    def __repr__(self):
        return f'<Ticket {self.id}>'


class BitacoraTicket(db.Model):
    """Modelo que representa la bitácora de tickets."""
    __tablename__ = 'bitacora_tickets'

    id = db.Column(db.BigInteger, primary_key=True)
    ticket_id = db.Column(db.BigInteger, db.ForeignKey('tickets.id'), nullable=False, index=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey('usuarios.id'), nullable=False, index=True)
    comment = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=db.func.now())

    ticket = db.relationship('Ticket', backref=db.backref('bitacoras', lazy='dynamic'))
    user = db.relationship('Usuario', backref=db.backref('bitacoras', lazy='dynamic'))

    def __repr__(self):
        return f'<BitacoraTicket {self.id}>'


class Facturacion(db.Model):
    """Modelo que representa la facturación asociada a tickets."""
    __tablename__ = 'facturacion'

    id = db.Column(db.BigInteger, primary_key=True)
    ticket_id = db.Column(db.BigInteger, db.ForeignKey('tickets.id'), nullable=False, index=True)
    amount = db.Column(db.Numeric, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    invoice_date = db.Column(db.Date, nullable=True)
    payment_date = db.Column(db.Date, nullable=True)

    ticket = db.relationship('Ticket', backref=db.backref('facturaciones', lazy='dynamic'))

    def __repr__(self):
        return f'<Facturacion {self.id}>'

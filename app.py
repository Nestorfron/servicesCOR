from flask import Flask, redirect, url_for, send_from_directory
from flask_migrate import Migrate
from backend.extensions import db
from flask_cors import CORS
from backend.routes import api
from backend.config import Config
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from backend.models import Customer, Provider, Engineer, Branch, User, Ticket, History_ticket, Invoice
from dotenv import load_dotenv
from sqlalchemy import text
from flask_jwt_extended import JWTManager
from datetime import timedelta
import os

# Cargar variables de entorno desde el archivo .env
load_dotenv()

def create_app():
    app = Flask(__name__, static_folder='dist', static_url_path='')

    # Cargar la configuración desde el archivo de configuración
    app.config.from_object(Config)

    # Configuración de JWT
    token_expiration = int(os.environ.get('JWT_ACCESS_TOKEN_EXPIRES', 3600))  # Por defecto 1 hora
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(seconds=token_expiration)
    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your_jwt_secret_key')

    # Inicializar extensiones
    db.init_app(app)
    jwt = JWTManager(app)
    migrate = Migrate(app, db)

    # Verificar la conexión a la base de datos
    with app.app_context():
        try:
            with db.session.begin():
                db.session.execute(text("SELECT 1"))
        except Exception as e:
            print(f"Error al conectar a la base de datos: {e}")

    # Habilitar CORS
    CORS(app)

    # Registrar las rutas de la API
    app.register_blueprint(api, url_prefix='/api')

    # Configurar Flask-Admin
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='Admin Panel', template_mode='bootstrap3')
    admin.add_view(ModelView(Customer, db.session, endpoint='customers'))
    admin.add_view(ModelView(Provider, db.session, endpoint='providers'))
    admin.add_view(ModelView(Engineer, db.session, endpoint='engineers'))
    admin.add_view(ModelView(Branch, db.session, endpoint='branches'))
    admin.add_view(ModelView(User, db.session, endpoint='users'))
    admin.add_view(ModelView(Ticket, db.session, endpoint='tickets'))
    admin.add_view(ModelView(History_ticket, db.session, endpoint='history_tickets'))
    admin.add_view(ModelView(Invoice, db.session, endpoint='invoices'))

    # Ruta principal para servir el frontend
    @app.route('/')
    def serve_frontend():
        return send_from_directory(app.static_folder, 'index.html')

    # Ruta para servir otros archivos estáticos (CSS, JS, etc.)
    @app.route('/<path:path>')
    def send_static(path):
        return send_from_directory(app.static_folder, path)

    # Manejo de errores 404
    @app.errorhandler(404)
    def not_found(error):
        return send_from_directory(app.static_folder, 'index.html'), 404

    return app

if __name__ == '__main__':
    app = create_app()
    PORT = int(os.environ.get('PORT', 3001))
    debug_mode = os.environ.get('FLASK_DEBUG', '0') == '1'
    app.run(host='0.0.0.0', port=PORT, debug=debug_mode)

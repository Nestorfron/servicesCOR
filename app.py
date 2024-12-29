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
import os


# Cargar variables de entorno desde el archivo .env

load_dotenv()

def create_app():
    app = Flask(__name__, static_folder='dist', static_url_path='')  # 'dist' generado por Vite
    app.config.from_object(Config)

    # Inicializar la base de datos
    db.init_app(app)
    migrate = Migrate(app, db)

    # Verificar conexión a la base de datos
    with app.app_context():
        try:
            with db.session.begin():
                db.session.execute(text("SELECT 1"))
            print("Conexión a la base de datos exitosa")
        except Exception as e:
            print(f"Error al conectar a la base de datos: {e}")
            exit(1)

    # Habilitar CORS
    CORS(app)

    app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')

    # Habilitar JWT

    JWTManager(app)

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
    admin.add_view(ModelView(Invoice, db.session, endpoint='ivoices'))

    # Ruta principal para servir el frontend
    @app.route('/')
    def serve_frontend():
        return send_from_directory(app.static_folder, 'index.html')

    # Ruta para servir otros archivos estáticos (CSS, JS, etc.)
    @app.route('/<path:path>')
    def send_static(path):
        try:
            return send_from_directory(app.static_folder, path)
        except Exception:
            return send_from_directory(app.static_folder, 'index.html')

    # Ruta para favicon
    @app.route('/favicon.ico')
    def favicon():
        return send_from_directory(app.static_folder, 'favicon.ico', mimetype='image/vnd.microsoft.icon')

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

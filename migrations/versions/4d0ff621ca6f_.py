"""empty message

Revision ID: 4d0ff621ca6f
Revises: 258e5626f68b
Create Date: 2025-01-05 21:07:53.761804

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4d0ff621ca6f'
down_revision = '258e5626f68b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('customers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('role', sa.String(length=50), nullable=True))

    with op.batch_alter_table('engineers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('role', sa.String(length=50), nullable=True))
        batch_op.add_column(sa.Column('is_active', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('engineers', schema=None) as batch_op:
        batch_op.drop_column('is_active')
        batch_op.drop_column('role')

    with op.batch_alter_table('customers', schema=None) as batch_op:
        batch_op.drop_column('role')

    # ### end Alembic commands ###

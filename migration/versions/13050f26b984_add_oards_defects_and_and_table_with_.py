"""add oards defects and and table with defect type

Revision ID: 13050f26b984
Revises: 2a527794a09c
Create Date: 2024-07-22 14:00:27.972100

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '13050f26b984'
down_revision: Union[str, None] = '2a527794a09c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    # Создание таблицы defects_types
    op.create_table(
        'defects_types',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('defect_name', sa.Text, nullable=False)
    )
    # Добавление нового поля defect_type в таблицу boards
    op.add_column('boards', sa.Column('defect_type', sa.ARRAY(sa.Integer), nullable=True))


def downgrade():
    # Удаление поля defect_type из таблицы boards
    op.drop_column('boards', 'defect_type')

    # Удаление таблицы defects_types
    op.drop_table('defects_types')

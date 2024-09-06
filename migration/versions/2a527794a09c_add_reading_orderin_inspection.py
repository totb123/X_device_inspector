"""add reading_orderin inspection

Revision ID: 2a527794a09c
Revises: 7f678bcff247
Create Date: 2024-07-18 17:02:52.732185

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '2a527794a09c'
down_revision: Union[str, None] = '7f678bcff247'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute(
        "ALTER TABLE inspections ADD COLUMN reading_order BOOLEAN DEFAULT true;")
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute("ALTER TABLE inspections DROP COLUMN reading_order;")
    # ### end Alembic commands ###

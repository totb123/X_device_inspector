"""create current party table

Revision ID: f278acfc6997
Revises: 6567d4bc55b9
Create Date: 2024-08-14 10:07:22.310897

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f278acfc6997'
down_revision: Union[str, None] = '6567d4bc55b9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table('current_party',
                    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
                    sa.Column('specification_id', sa.INTEGER(), autoincrement=False, nullable=True),
                    sa.Column('side', sa.VARCHAR(), autoincrement=False, nullable=True),
                    sa.ForeignKeyConstraint(['specification_id'], ['specifications.id'],
                                            name='current_party_specification_id_fkey'),
                    sa.PrimaryKeyConstraint('id', name='current_party_pkey')
                    )


def downgrade() -> None:
    op.drop_table('specifications')

"""create specification

Revision ID: dee9e58fc464
Revises: f371fedebb90
Create Date: 2024-08-07 13:37:46.692685

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'dee9e58fc464'
down_revision: Union[str, None] = 'f371fedebb90'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'specifications',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(50), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.add_column('multiboards', sa.Column('specification_id', sa.Integer))
    op.create_foreign_key(
        constraint_name=None,
        source_table='multiboards', 
        referent_table='specifications', 
        local_cols=['specification_id'], 
        remote_cols=['id']
        )
    op.add_column('sectors_dm_position', sa.Column('specification_id', sa.Integer))
    op.create_foreign_key(
        constraint_name=None,
        source_table='sectors_dm_position', 
        referent_table='specifications', 
        local_cols=['specification_id'], 
        remote_cols=['id']
        )



def downgrade() -> None:
    op.drop_table('specifications')
    op.drop_column('multiboards', 'specification_id')
    op.drop_column('sectors_dm_position', 'specification_id')

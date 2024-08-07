"""insert_data

Revision ID: 7f678bcff247
Revises: 2fe36a96e5cf
Create Date: 2024-07-17 14:38:12.032205

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '7f678bcff247'
down_revision: Union[str, None] = '49faf4192feb'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.execute(
        "INSERT INTO sectors(id,step_num,name) VALUES(1,1, 'Гравёр'),(2,2, 'Паста'),(3,3, 'SMD-компоненты')")
    op.execute(
        "INSERT INTO sectors_dm_position(id,id_sector,side,coordinates_1,coordinates_2,coordinates_3,coordinates_4,coordinates_5,coordinates_6,coordinates_7,coordinates_8) VALUES(1,1, 'top','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1'),(2,1, 'bot','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1'),(3,2, 'top','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1'),(4,2, 'bot','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1'),(5,3, 'top','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1'),(6,3, 'bot','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1','1,1,1,1')")
    # ### end Alembic commands ###


def downgrade() -> None:
    op.execute("DELETE FROM sectors WHERE id IN (1,2,3);")
    op.execute("DELETE FROM sectors_dm_position WHERE id IN (1,2,3,4,5,6)")
    # ### end Alembic commands ###

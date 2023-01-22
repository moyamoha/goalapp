import { NotFoundException } from '@nestjs/common';
import { UserDocument } from 'src/schemas/user.schema';
import { Document } from 'mongoose';
import { IEntity, ItemType } from 'src/types/custom';
import { ForbiddenException } from '@nestjs/common/exceptions';

export const throwExceptionIfItemNotFoundOrForbidden = <T extends IEntity>(
  user: UserDocument,
  item: T,
) => {
  if (!item) {
    throw new NotFoundException(
      `${item.modelName} with id of ${item._id} was not found`,
    );
  }
  if (item.owner.toString() !== user._id.toString()) {
    throw new ForbiddenException();
  }
};

import { PipeTransform } from '@nestjs/common';
import { SortDirection } from '../../../main/types/enums';
import { FindBlogsQueryModel } from './FindBlogsQueryModel';

class FindBlogsQueryPipe implements PipeTransform<any, FindBlogsQueryModel> {
  transform(query: any): FindBlogsQueryModel {
    const searchNameTerm = query.searchNameTerm || '';

    let pageNumber = +query.pageNumber || 1;
    pageNumber = pageNumber < 1 ? 1 : pageNumber;

    let pageSize = +query.pageSize || 10;
    pageSize = pageSize < 1 ? 10 : pageSize;

    let sortBy = query.sortBy || 'createdAt';
    const fields = ['id', 'name', 'websiteUrl', 'createdAt'];
    sortBy = !fields.includes(sortBy) ? 'createdAt' : sortBy === 'id' ? '_id' : sortBy;

    let sortDirection = query.sortDirection || SortDirection.desc;
    sortDirection = sortDirection !== SortDirection.asc ? SortDirection.desc : SortDirection.asc;

    return { searchNameTerm, pageNumber, pageSize, sortBy, sortDirection };
  }
}

export const findBlogsQueryPipe = new FindBlogsQueryPipe();

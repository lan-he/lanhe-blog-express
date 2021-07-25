import { Injectable } from '@nestjs/common';
// import * as Sequelize from 'sequelize'; // 引入 Sequelize 库
import sequelize from '../../database/sequelize';
@Injectable()
export class ArticleService {
  /**
   * 创建商品
   * @param {*} body
   * @param {string} username
   * @returns {Promise<any>}
   * @memberof CommodityService
   */
  async createArticle(body: any): Promise<any> {
    const {
      articleId = 0,
      articleTitle = '文章名称',
      primarImg = '',
      articleDesc = '文章缩略展示',
      articleContent = '789798789',
      createId = 0,
      status = '0',
      articleLabel = 'js',
    } = body;
    const createCommoditySQL = `
      INSERT INTO article_info
      (article_content, article_id, article_title, primary_img, article_desc, create_id, status, article_label, create_user, modify_user)
      VALUES
      (${articleContent}, '${articleId}', '${articleTitle}', '${primarImg}', '${articleDesc}', ${createId}, '${status}', '${articleLabel}' , '0', '0');
      `;
    await sequelize.query(createCommoditySQL, { logging: false });
    return {
      code: 200,
      msg: 'Success',
    };
  }
  async createCommodity(body: any, username: string): Promise<any> {
    const {
      columnId = 0,
      name,
      description = '',
      marketPrice = 0,
      saleMoney = 0,
    } = body;
    const createCommoditySQL = `
      INSERT INTO commodity
      (ccolumn_id, commodity_name, commodity_desc, market_price, sale_money,
      c_by)
      VALUES
      ('${columnId}', '${name}', '${description}', ${marketPrice},
      ${saleMoney}, '${username}');
      `;
    await sequelize.query(createCommoditySQL, { logging: false });
    return {
      code: 200,
      msg: 'Success',
    };
  }
}

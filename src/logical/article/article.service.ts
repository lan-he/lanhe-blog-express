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
  async createCommodity(body: any): Promise<any> {
    const {
      articleTitle = '文章名称',
      primarImg = '',
      articleDesc = '文章缩略展示',
      articleContent = '文章内容',
      createId = '创建人id',
      status = '0',
      articleLabel = 'js',
    } = body;
    const createCommoditySQL = `
      INSERT INTO article_info
      (article_title, primary_img, article_desc, article_content, create_id, status, article_label)
      VALUES
      ('${articleTitle}', '${primarImg}', '${articleDesc}', ${articleContent}, ${createId}, '${status}', '${articleLabel}');
      `;
    await sequelize.query(createCommoditySQL, { logging: false });
    return {
      code: 200,
      msg: 'Success',
    };
  }
}

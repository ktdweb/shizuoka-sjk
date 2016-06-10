<?php
/**
 * Web App REST API
 *
 * @link https://github.com/kobabasu/rest-php.git
 */

namespace Routes;

/**
 * users
 */
$app->group('/products', function () {

    /**
     * GET /products/
     * 商品全体用
     */
    $this->get(
        '/',
        function (
            $request,
            $response,
            $args
        ) {
            $db = $this->get('db.get');
            $body = array();

            // page
            $sql = 'SELECT * FROM `products_all`';
            $sql .= 'ORDER BY `id`;';
            $body = $db->execute($sql);

            // images
            $mergeImgs = $this->get('common.mergeImgArr');
            $res = $mergeImgs->mergeForAll($body);

            return $response->withJson(
                $res,
                200,
                $this->get('settings')['withJsonEnc']
            );
        }
    );


    /**
     * GET /detail/
     * ひとつの商品を取得
     */
    $this->get(
        '/detail/{ref_id:.*}',
        function (
            $request,
            $response,
            $args
        ) {
            $db = $this->get('db.get');
            $body = array();

            // get page
            $sql = 'SELECT * FROM `products_all`';
            $sql .= ' WHERE `ref_id` = ?;';
            $item = $db->execute($sql, $args['ref_id'])[0];

            // get detail
            $sql = 'SELECT * FROM `' . $item->page . '`';
            $sql .= ' WHERE `ref_id` = ?;';
            $body = $db->execute($sql, $args['ref_id']);

            // images
            $mergeImgs = $this->get('common.mergeImgArr');
            $res = $mergeImgs->merge($body);

            return $response->withJson(
                $res,
                200,
                $this->get('settings')['withJsonEnc']
            );
        }
    );

    /**
     * GET /products/vehicles/1/280330B
     * 各ページ用
     *
     * /products/vehicles/ - ページの商品全体
     * /products/vehicles/1/ - category_idの1のみ
     * /products/vehicles/1/280330B/ - ref_idを指定
     * どれも最後のtrailerのスラッシュがなくても良い
     */
    $this->get(
        '/{page:[a-z]+}[/{category:[0-9]*/*}{id:.*}]',
        function (
            $request,
            $response,
            $args
        ) {
            $exp = '/[^0-9a-zA-Z]/';
            $db = $this->get('db.get');
            $param = array();

            // page
            $sql = 'SELECT * FROM ';
            if (!empty($args['page'])) {
                $page = preg_replace($exp, '', $args['page']);
                $sql .= '`' . $page . '`';
            }

            // cateogry
            if (!empty($args['category'])) {
                $cat = preg_replace($exp, '', $args['category']);
                $where[] = '`category_id` = ?';
                $param[] = $cat;
            }

            // args
            if (!empty($args['id'])) {
                $id = preg_replace($exp, '', $args['id']);
                $where[] = '`ref_id` = ?';
                $param[] = $id;
            }

            // sql
            if (!empty($where)) {
                $sql .= ' WHERE ' . implode(' AND ', $where);
            }

            $body = $db->execute($sql, $param);

            // images
            $mergeImgs = $this->get('common.mergeImgArr');
            $res = $mergeImgs->merge($body);

            return $response->withJson(
                $res,
                200,
                $this->get('settings')['withJsonEnc']
            );
        }
    );

    /**
     * POST
     */
    $this->post(
        '/',
        function (
            $request,
            $response,
            $args
        ) {
            $body = $request->getParsedBody();

            $db = $this->get('db.post');

            $sql  = 'INSERT INTO `users` ';

            $fields = array_keys($body);
            $values = array_values($body);
            $holder = array_fill(0, count($values), '?');

            $sql .= '(' . implode(', ', $fields) . ')';
            $sql .= ' VALUES ';
            $sql .= '(' . implode(', ', $holder) . ')';

            $db->execute($sql, $values);

            return $response->withJson(
                $body,
                200,
                $this->get('settings')['withJsonEnc']
            );
        }
    );

    /**
     * PUT
     */
    $this->put(
        '/{id:[0-9]+}',
        function (
            $request,
            $response,
            $args
        ) {
            $body = $request->getParsedBody();

            $db = $this->get('db.put');

            $fields = array_keys($body);
            $values = array_values($body);

            $sql = 'UPDATE `users` SET ';
            $sql .= implode(' = ?, ', $fields) . ' = ?';
            $sql .= ' WHERE `id` = ' . (int)$args['id'];

            $res = $db->execute($sql, $values);

            return $response->withJson(
                $res,
                200,
                $this->get('settings')['withJsonEnc']
            );
        }
    );

    /**
     * DELETE
     */
    $this->delete(
        '/{id:[0-9]+}',
        function (
            $request,
            $response,
            $args
        ) {
            $db = $this->get('db.delete');

            $sql = 'DELETE FROM `users` ';
            $sql .= 'WHERE `id` = ' . (int)$args['id'];

            $res = $db->execute($sql);

            return $response->withJson(
                $res,
                200,
                $this->get('settings')['withJsonEnc']
            );
        }
    );

});

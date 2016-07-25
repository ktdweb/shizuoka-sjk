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
     * GET /top/
     * トップページ用
     */
    $this->get(
        '/top/',
        function (
            $request,
            $response,
            $args
        ) {
            $db = $this->get('db.get');
            $body = array();

            // page
            $sql = 'SELECT * FROM `products_top`';
            $sql .= ' ORDER BY `modified` DESC;';
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
     * GET /products/search/parts/free/
     * フリーワード検索用
     */
    $this->get(
        '/search/parts/free/{key:.*}',
        function (
            $request,
            $response,
            $args
        ) {
            $db = $this->get('db.get');
            $keys = explode(" ", urldecode($args['key']));

            $sql = 'SELECT * FROM `parts` WHERE ';

            foreach ($keys as $val) {
                $term = "(`description` LIKE '%" . $val . "%'";
                $term .= " OR `name` LIKE '%" . $val . "%')";
                $where[] = $term;
            }

            $sql .= implode(" AND ", $where);

            $body = $db->execute($sql);

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
     * GET /products/search/parts/1/1/1/
     * 部品検索用
     */
    $this->get(
        '/search/parts/{cat:[0-9]+}/{sub:[0-9]+}/{maker:[0-9]+}/{size:[0-9]+}/',
        function (
            $request,
            $response,
            $args
        ) {
            $db = $this->get('db.get');
            $param = array();

            // page
            $sql = 'SELECT * FROM `parts` ';

            // cat
            if ($args['cat'] <= 8) {
                $where[] = '`category_id` = ?';
                $param[] = $args['cat'];
            }

            // sub
            if ($args['sub'] != 0) {
                $where[] = '`sub_category_id` = ?';
                $param[] = $args['sub'];
            }

            // maker
            if ($args['maker'] != 6) {
                $where[] = '`maker_id` = ?';
                $param[] = $args['maker'];
            }

            // size
            if ($args['size'] != 4) {
                $where[] = '`size_id` = ?';
                $param[] = $args['size'];
            }

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
     * 管理画面 新規登録用
     */
    $this->post(
        '/add/{page:[a-z]+}/{id:.*}',
        function (
            $request,
            $response,
            $args
        ) {
            $body = $request->getParsedBody();

            $id = $args['id'];
            $page = $args['page'];

            if (!empty($page) && $id != 'undefined') {
                $db = $this->get('db.post');

                $sql  = "INSERT INTO `{$page}` (";

                switch ($page) {
                    case 'vehicles':
                        $sql .= '
                          `product_id`,
                          `ref_id`,
                          `category_id`,
                          `maker_id`,
                          `size_id`,
                          `name`,
                          `created`,
                          `modified`
                        ';
                        $sql .= ') VALUES ';
                        $sql .= "('0', '{$id}', 1, 1, 1, '', NOW(), NOW());";
                        break;
                    case 'parts':
                        $sql .= '
                          `product_id`,
                          `ref_id`,
                          `category_id`,
                          `sub_category_id`,
                          `maker_id`,
                          `size_id`,
                          `name`,
                          `product_name`,
                          `created`,
                          `modified`
                        ';
                        $sql .= ') VALUES ';
                        $sql .= "('0', '{$id}', 0, 1, 1, 1, '', '', NOW(), NOW());";
                        break;
                    default:
                        $sql .= '
                          `product_id`,
                          `ref_id`,
                          `size_id`,
                          `name`,
                          `created`,
                          `modified`
                        ';
                        $sql .= ') VALUES ';
                        $sql .= "('0', '{$id}', 1, '', NOW(), NOW());";

                }

                $db->execute($sql);
            }

            return $response->withJson(
                $body,
                200,
                $this->get('settings')['withJsonEnc']
            );
        }
    );

    /**
     * PUT
     * 管理画面 編集用
     */
    $this->put(
        '/{page:[a-z]+}/{id:.*}',
        function (
            $request,
            $response,
            $args
        ) {
            $body = $request->getParsedBody();

            unset($body['images']);
            unset($body['id']);

            $db = $this->get('db.put');

            $fields = array_keys($body);
            $values = array_values($body);

            $sql = 'UPDATE `' . $args['page'] . '` SET ';
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
     * 管理画面 削除用
     */
    $this->delete(
        '/{page:[a-z]+}/{id:.*}',
        function (
            $request,
            $response,
            $args
        ) {
            $db = $this->get('db.delete');

            $sql = "DELETE FROM {$args['page']} ";
            $sql .= 'WHERE `ref_id` = ' . $args['id'];

            $res = $db->execute($sql);

            return $response->withJson(
                $res,
                200,
                $this->get('settings')['withJsonEnc']
            );
        }
    );
});

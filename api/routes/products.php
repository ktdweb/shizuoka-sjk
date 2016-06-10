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
     * GET
     */
    $this->get(
        '/',
        function (
            $request,
            $response,
            $args
        ) {
            $res = null;
            $db = $this->get('db.get');
            $body = array();

            // page
            $sql = 'SELECT * FROM `products_all`;';
            $body[] = $db->execute($sql);

            $sql = 'SELECT * FROM `parts`;';
            $body[] = $db->execute($sql);

            $sql = 'SELECT * FROM `containers`;';
            $body[] = $db->execute($sql);

            $sql = 'SELECT * FROM `mountings`;';
            $body[] = $db->execute($sql);

            // images
            if (!empty($body)) {
                $ids = null;
                foreach ($body as $val) {
                    $ids .= "'" . $val->ref_id . "', ";
                }
                $ids = substr($ids, 0, -2);
                $sql = 'select * from `images` ';
                $sql .= 'where `ref_id` in (' . $ids . ');';
                $images = $db->execute($sql);

                // sort
                foreach ($images as $val) {
                    $paths[$val->ref_id][] = $val->path;
                }

                // merge
                foreach ($body as $val) {
                    $id = $val->ref_id;
                    $res[$id] = (array)$val;
                    $res[$id]['images'] = $paths[$id];
                }
            }

            return $response->withJson(
                $res,
                200,
                $this->get('settings')['withJsonEnc']
            );
        }
    );


    /**
     * GET
     */
    $this->get(
        '/{page:[a-z]+}[/{category:[0-9]+/?}{id:.*}]',
        function (
            $request,
            $response,
            $args
        ) {
            $res = null;
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
            if (!empty($body)) {
                $ids = null;
                foreach ($body as $val) {
                    $ids .= "'" . $val->ref_id . "', ";
                }
                $ids = substr($ids, 0, -2);
                $sql = 'select * from `images` ';
                $sql .= 'where `ref_id` in (' . $ids . ');';
                $images = $db->execute($sql);

                // sort
                foreach ($images as $val) {
                    $paths[$val->ref_id][] = $val->path;
                }

                // merge
                foreach ($body as $val) {
                    $id = $val->ref_id;
                    $res[$id] = (array)$val;
                    $res[$id]['images'] = $paths[$id];
                }
            }

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

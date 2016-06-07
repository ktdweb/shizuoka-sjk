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
        '/{name:.*}/{id:.*}',
        function (
            $request,
            $response,
            $args
        ) {
            $db = $this->get('db.get');

            // mountings
            $sql = 'select * from ' . $args['name'];

            if ($args['id']) {
                $sql .= ' WHERE `ref_id` = ?;';
                $body = $db->execute($sql, $args['name']);
            } else {
                $body = $db->execute($sql);
            }

            // images
            $ids = null;
            foreach ($body as $val) {
                $ids .= $val->product_id . ', ';
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

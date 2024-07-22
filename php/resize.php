<?php
$path = str_replace('/img/', '', $_SERVER['REQUEST_URI']);
if (!preg_match('#-([0-9]+)\.(jpg|png|webp)$#', $path, $matches)) exit;
$size = $matches[1];
$format = $matches[2];
$path_original = __DIR__ . 'resize.php/' . str_replace('-' . $size . '.' . $format, '.' . $format, $path);

compress_image($path_original, $path, $size, 90);

function compress_image($source_url, $destination_url, $width, $quality) {
    $info = getimagesize($source_url);
    // Определяем пропорциональные размеры
    $original_width = $info[0];
    $original_height = $info[1];
    $aspect_ratio = $original_width / $original_height;
    $new_height = (int)($width / $aspect_ratio);

    if ($info['mime'] == 'image/jpeg') {
        $image = imagecreatefromjpeg($source_url);
    } elseif ($info['mime'] == 'image/png') {
        $image = imagecreatefrompng($source_url);
    } else {
        return 0;
    }

    // Создаем пустое изображение с новыми размерами
    $new_image = imagecreatetruecolor($width, $new_height);

    // Копируем и изменяем размеры существующего изображения на новое
    imagecopyresampled($new_image, $image, 0, 0, 0, 0, $width, $new_height, $original_width, $original_height);

  // Сохраняем изображение
    if ($info['mime'] == 'image/jpeg') {
		imageinterlace($new_image, true);
        imagejpeg($new_image, $destination_url, $quality);
		header('Content-Type: image/jpeg');
        imagejpeg($new_image, null, $quality);
    } elseif ($info['mime'] == 'image/png') {
        imagepng($new_image, $destination_url, round(9 * $quality / 100));
		header('Content-Type: image/png');
        imagepng($new_image, null, round(9 * $quality / 100));
    }




    // Освобождаем память
    imagedestroy($image);
    imagedestroy($new_image);
    return 0;
}

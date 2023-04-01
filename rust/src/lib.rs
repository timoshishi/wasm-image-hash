use img_hash::{HasherConfig, HashAlg};
use wasm_bindgen::prelude::*;
use web_sys::console;
use image::ImageFormat;
use std::io::Cursor;
use image::imageops::FilterType;

#[wasm_bindgen]
pub fn image_hash(data: &[u8], bits: u32, precise: bool) -> String {
    let hasher_config = HasherConfig::new().hash_alg(HashAlg::Gradient).hash_size(bits, bits);
    let hasher = hasher_config.to_hasher();

    let image_format = match ImageFormat::from_extension("jpg") {
        Some(format) => format,
        None => {
            console::error_1(&"Unsupported image format".into());
            return String::new();
        }
    };

    let image = match image::load(Cursor::new(data), image_format) {
        Ok(image) => image,
        Err(_) => {
            console::error_1(&"Failed to load image".into());
            return String::new();
        }
    };

    let resized_image = if precise {
        image.resize(512, 512, FilterType::Lanczos3)
    } else {
        image.resize(32, 32, FilterType::Nearest)
    };

    let hash = hasher.hash_image(&resized_image);
    hash.to_base64()
}

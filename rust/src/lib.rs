mod utils;
use image::io::Reader as ImageReader;
use img_hash::{HasherConfig, HashAlg};
use wasm_bindgen::prelude::*;
use web_sys::console;
use image::imageops::FilterType;
use std::io::Cursor;

#[wasm_bindgen]
pub fn image_hash(data: &[u8], bits: u32, precise: bool) -> Result<String, JsValue> {
    let hasher_config = HasherConfig::new().hash_alg(HashAlg::Gradient).hash_size(bits, bits);
    let hasher = hasher_config.to_hasher();

    // Check if image format is supported
    let format = match image::guess_format(data) {
        Ok(f) => f,
        Err(_) => return Err(JsValue::from_str("Unsupported image format")),
    };

    let image = ImageReader::new(Cursor::new(data))
        .with_guessed_format()
        .map_err(|e| JsValue::from_str(&e.to_string()))?
        .decode()
        .map_err(|e| JsValue::from_str(&e.to_string()))?;

    let resized_image = if precise {
        image.resize(512, 512, FilterType::Lanczos3)
    } else {
        image.resize(32, 32, FilterType::Nearest)
    };

    let hash = hasher.hash_image(&resized_image);
    Ok(hash.to_base64())
}

mod utils;
use img_hash::{HasherConfig, HashAlg};
use wasm_bindgen::prelude::*;
use web_sys::console;
use image::ImageFormat;
use std::io::Cursor;
use image::imageops::FilterType;
// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

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

// Tests
#[cfg(test)]
mod tests {
    use super::*;
    use wasm_bindgen_test::*;
    use std::fs::read;

    wasm_bindgen_test_configure!(run_in_node);

    #[wasm_bindgen_test]
    fn test_image_hash_quick() {
        let image_data = read("tests/images/_95695590_tv039055678.jpg").expect("Failed to read test image");
        let hash = image_hash(&image_data, 16, false);
        assert_eq!(hash, "0773063f063f36070e070a070f378e7f1f000fff0fff020103f00ffb0f810ff0");
    }

    #[wasm_bindgen_test]
    fn test_image_hash_precise() {
        let image_data = read("tests/images/test_image.jpg").expect("Failed to read test image");
        let hash = image_hash(&image_data, 8, true);
        assert_eq!(hash, "expected_precise_hash_base64");
    }
}   



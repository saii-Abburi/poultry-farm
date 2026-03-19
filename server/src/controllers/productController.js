const Product = require('../models/Product');
const { cloudinary } = require('../middleware/uploadMiddleware');

// Helper: extract the URL from a multer-cloudinary file object and apply optimizations
const getFileUrl = (file) => {
    let url = file.secure_url || file.path || '';
    if (url) {
        // In Cloudinary, modifying the delivery URL with `f_auto,q_auto` optimizes the rendering size and format
        // while safely keeping the absolute ORIGINAL file intact inside your Cloudinary storage folder.
        return url.replace('/upload/', '/upload/f_auto,q_auto/');
    }
    return '';
};

// Helper: extract public_id from Cloudinary URL
const getPublicIdFromUrl = (url) => {
    try {
        if (!url) return null;
        const splitUrl = url.split('/upload/');
        if (splitUrl.length === 2) {
            const pathParts = splitUrl[1].split('/');
            // Remove the version tag (e.g., v1634567890) from the array
            pathParts.shift();
            const fullPath = pathParts.join('/');
            // Remove the file extension
            return fullPath.substring(0, fullPath.lastIndexOf('.'));
        }
        return null;
    } catch (e) {
        return null;
    }
};

const getProducts = async (req, res) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;
        const keyword = req.query.keyword
            ? { name: { $regex: req.query.keyword, $options: 'i' } }
            : {};

        const count = await Product.countDocuments({ ...keyword });
        const products = await Product.find({ ...keyword })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ createdAt: -1 });

        res.json({ products, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const products = await Product.find({ category }).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, category, price, discount } = req.body;

        // Validate required fields explicitly for a clear error message
        if (!name || !description || !category || !price) {
            return res.status(400).json({ message: 'name, description, category, and price are required.' });
        }

        const files = req.files;
        let images = [];
        let video = '';

        if (files && files['images']) {
            images = files['images'].map(getFileUrl);
        }
        if (files && files['video'] && files['video'].length > 0) {
            video = getFileUrl(files['video'][0]);
        }

        const product = new Product({
            name,
            description,
            category,
            price: Number(price),
            discount: Number(discount) || 0,
            images,
            video,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error('createProduct error:', error);
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, description, category, price, discount } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.category = category || product.category;
        product.price = price !== undefined ? Number(price) : product.price;
        product.discount = discount !== undefined ? Number(discount) : product.discount;

        const files = req.files;
        if (files && files['images'] && files['images'].length > 0) {
            product.images = files['images'].map(getFileUrl);
        }
        if (files && files['video'] && files['video'].length > 0) {
            product.video = getFileUrl(files['video'][0]);
        }

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        console.error('updateProduct error:', error);
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            // Remove images from Cloudinary
            if (product.images && product.images.length > 0) {
                for (const url of product.images) {
                    const publicId = getPublicIdFromUrl(url);
                    if (publicId) {
                        await cloudinary.uploader.destroy(publicId, { resource_type: 'image' }).catch(err => console.error("Cloudinary img delete err:", err));
                    }
                }
            }

            // Remove video from Cloudinary
            if (product.video) {
                const publicId = getPublicIdFromUrl(product.video);
                if (publicId) {
                    await cloudinary.uploader.destroy(publicId, { resource_type: 'video' }).catch(err => console.error("Cloudinary video delete err:", err));
                }
            }

            await product.deleteOne();
            res.json({ message: 'Product and associated media removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        console.error('deleteProduct error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProductsByCategory,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};

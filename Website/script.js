// Global state for Stickers
let orderData = {
    unit: 'mm',
    length: null,
    width: null,
    quantity: null,
    hasDesign: null,
    paperType: null,
    stickersPerSheet: null,
    stickersPerRow: null,
    rows: null,
    sheetsRequired: null,
    totalCost: null
};

// Global state for Business Cards
let bcOrderData = {
    unit: 'mm',
    length: null,
    width: null,
    quantity: null,
    hasDesign: null,
    paperType: null,
    cardsPerSheet: null,
    cardsPerRow: null,
    rows: null,
    sheetsRequired: null,
    totalCost: null
};

// Paper pricing for Stickers
const paperPricing = {
    art: { 
        first: 100, 
        addon: 85, 
        name: 'Artsticker',
        description: 'Our 17.5 x 11.5 inch matte lamination sticker sheets with digital print are made for those who want a sleek, non-glossy look. Print anything from logos and illustrations to text and icons in any size, shape, or style. We precision-cut each design so it\'s ready to peel and stick whenever you like.',
        features: [
            'Smooth Matte Finish - No glare, just style',
            'High-Quality Digital Print - Crisp, vibrant, and detailed',
            'Any Design. Any Shape. Any Size.',
            'Durable & Scratch-Resistant',
            'Peel & Stick Anywhere - Bottles, boxes, laptops, packaging, and more',
            'Professional Look - Perfect for branding, product labels, and creatives',
            'Just peel, stick, and stand out.'
        ]
    },
    synthetic: { 
        first: 180, 
        addon: 130, 
        name: 'Synthetic',
        description: 'Premium synthetic sticker sheets with matte finish and high-quality digital printing. Perfect for professional branding and product labeling.',
        features: [
            'Smooth Matte Finish - No glare, just style',
            'High-Quality Digital Print - Crisp, vibrant, and detailed',
            'Any Design. Any Shape. Any Size.',
            'Durable & Scratch-Resistant',
            'Peel & Stick Anywhere - Bottles, boxes, laptops, packaging, and more',
            'Professional Look - Perfect for branding, product labels, and creatives'
        ]
    },
    transparent: { 
        first: 180, 
        addon: 130, 
        name: 'Transparent',
        description: 'Crystal-clear transparent sticker sheets with water-resistant properties. Perfect for windows, glass surfaces, and transparent applications.',
        features: [
            'Crystal-Clear Finish - See-through quality',
            'Water-Resistant - Perfect for outdoor use',
            'High-Quality Digital Print - Crisp, vibrant, and detailed',
            'Durable & Scratch-Resistant',
            'Peel & Stick Anywhere - Windows, glass, bottles, and more',
            'Professional Look - Perfect for branding and product labels'
        ]
    }
};

// Paper pricing for Artboard/Artpaper Printing
const bcPaperPricing = {
    '100gsm': {
        first: 100,
        addon: 55,
        name: '100 GSM Art Paper',
        description: 'Our 17.5 × 11.5 inch 100 GSM art paper is lightweight and smooth, designed for cost-effective and high-volume printing.',
        features: [
            'Smooth Paper Finish',
            'Ideal for flyers, inserts & promotional prints'
        ]
    },
    '130gsm': {
        first: 100,
        addon: 60,
        name: '130 GSM Art Paper',
        description: 'Our 17.5 × 11.5 inch 130 GSM art paper offers better thickness with crisp digital print quality.',
        features: [
            'Smooth Surface with Better Strength',
            'Ideal for labels, branding & everyday prints'
        ]
    },
    '170gsm': {
        first: 100,
        addon: 60,
        name: '170 GSM Art Paper',
        description: 'Our 17.5 × 11.5 inch 170 GSM art paper delivers a stronger, more durable feel with sharp print clarity.',
        features: [
            'Premium Thickness',
            'Ideal for product inserts & professional branding'
        ]
    },
    '250gsm': {
        first: 130,
        addon: 80,
        name: '250 GSM Art Board',
        description: 'Our 17.5 × 11.5 inch 250 GSM art board provides a sturdy, premium base for high-quality prints.',
        features: [
            'Thick & Durable Board',
            'Ideal for packaging, tags & display use'
        ]
    },
    '300gsm': {
        first: 130,
        addon: 80,
        name: '300 GSM Art Board',
        description: 'Our 17.5 × 11.5 inch 300 GSM art board offers extra strength with a bold, premium appearance.',
        features: [
            'Extra Thick & Sturdy',
            'Ideal for luxury packaging & premium cards'
        ]
    },
    'ivory': {
        first: 150,
        addon: 100,
        name: 'Ivory Board',
        description: 'Our 17.5 × 11.5 inch ivory board features a smooth off-white tone for a clean and elegant finish.',
        features: [
            'Smooth Ivory Finish',
            'Ideal for premium packaging & branding'
        ]
    },
    'linen': {
        first: 150,
        addon: 105,
        name: 'Linen Texture',
        description: 'Our 17.5 × 11.5 inch linen texture paper adds a unique textured feel for a refined look.',
        features: [
            'Premium Linen Texture',
            'Ideal for invitations & creative branding'
        ]
    },
    'linen-ivory': {
        first: 150,
        addon: 105,
        name: 'Linen Ivory',
        description: 'Our 17.5 × 11.5 inch linen ivory paper combines a rich linen texture with an elegant ivory tone, creating a luxurious and premium printing experience.',
        features: [
            'Linen Textured Ivory Finish',
            'Ideal for luxury branding, invitations & cards'
        ]
    }
};

// Paper size in inches (printing area - converted to mm for calculations)
const PAPER_WIDTH_INCH = 17.5;
const PAPER_HEIGHT_INCH = 11.5;
const SPACING_MM = 2;

// Convert inches to mm
function inchToMm(inch) {
    return inch * 25.4;
}

// Convert mm to inches
function mmToInch(mm) {
    return mm / 25.4;
}

// Select option from landing page
function selectOption(option) {
    if (option === 'stickers') {
        document.getElementById('landing-page').classList.remove('active');
        document.getElementById('stickers-page').classList.add('active');
    } else if (option === 'business-card') {
        document.getElementById('landing-page').classList.remove('active');
        document.getElementById('business-card-page').classList.add('active');
    }
}

// Go back to landing page
function goBack() {
    document.getElementById('stickers-page').classList.remove('active');
    document.getElementById('business-card-page').classList.remove('active');
    document.getElementById('landing-page').classList.add('active');
    resetStickerData();
    resetBCData();
}

// Reset sticker data
function resetStickerData() {
    orderData = {
        unit: 'mm',
        length: null,
        width: null,
        quantity: null,
        hasDesign: null,
        paperType: null,
        stickersPerSheet: null,
        stickersPerRow: null,
        rows: null,
        sheetsRequired: null,
        totalCost: null
    };
    document.getElementById('length').value = '';
    document.getElementById('width').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('paper-format').value = '';
    document.getElementById('product-details').style.display = 'none';
    document.getElementById('pricing-info').style.display = 'none';
    document.getElementById('btn-calculate').style.display = 'none';
    document.getElementById('layout-info-section').style.display = 'none';
    document.getElementById('cost-breakdown-section').style.display = 'none';
    document.getElementById('action-buttons').style.display = 'none';
    document.getElementById('btn-has-design').classList.remove('active');
    document.getElementById('btn-no-design').classList.remove('active');
}

// Reset business card data
function resetBCData() {
    bcOrderData = {
        unit: 'mm',
        length: null,
        width: null,
        quantity: null,
        hasDesign: null,
        paperType: null,
        cardsPerSheet: null,
        cardsPerRow: null,
        rows: null,
        sheetsRequired: null,
        totalCost: null
    };
    document.getElementById('bc-length').value = '';
    document.getElementById('bc-width').value = '';
    document.getElementById('bc-quantity').value = '';
    document.getElementById('bc-paper-format').value = '';
    document.getElementById('bc-product-details').style.display = 'none';
    document.getElementById('bc-pricing-info').style.display = 'none';
    document.getElementById('bc-btn-calculate').style.display = 'none';
    document.getElementById('bc-layout-info-section').style.display = 'none';
    document.getElementById('bc-cost-breakdown-section').style.display = 'none';
    document.getElementById('bc-action-buttons').style.display = 'none';
    document.getElementById('bc-btn-has-design').classList.remove('active');
    document.getElementById('bc-btn-no-design').classList.remove('active');
}

// Toggle unit for stickers
function toggleUnit(unit) {
    orderData.unit = unit;
    document.getElementById('toggle-mm').classList.toggle('active', unit === 'mm');
    document.getElementById('toggle-inch').classList.toggle('active', unit === 'inch');
    document.getElementById('unit-label-length').textContent = unit;
    document.getElementById('unit-label-width').textContent = unit;
    validateDimensions();
}

// Toggle unit for business cards
function toggleBCUnit(unit) {
    bcOrderData.unit = unit;
    document.getElementById('bc-toggle-mm').classList.toggle('active', unit === 'mm');
    document.getElementById('bc-toggle-inch').classList.toggle('active', unit === 'inch');
    document.getElementById('bc-unit-label-length').textContent = unit;
    document.getElementById('bc-unit-label-width').textContent = unit;
    validateBCDimensions();
}

// Validate dimensions for stickers
function validateDimensions() {
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    
    if (length > 0 && width > 0) {
        orderData.length = length;
        orderData.width = width;
    } else {
        orderData.length = null;
        orderData.width = null;
    }
    
    // Check if calculate button should be shown
    if (orderData.paperType && orderData.length && orderData.width && orderData.quantity) {
        document.getElementById('btn-calculate').style.display = 'block';
    } else {
        document.getElementById('btn-calculate').style.display = 'none';
    }
}

// Validate dimensions for business cards
function validateBCDimensions() {
    const length = parseFloat(document.getElementById('bc-length').value);
    const width = parseFloat(document.getElementById('bc-width').value);
    
    if (length > 0 && width > 0) {
        bcOrderData.length = length;
        bcOrderData.width = width;
    } else {
        bcOrderData.length = null;
        bcOrderData.width = null;
    }
    
    // Check if calculate button should be shown
    if (bcOrderData.paperType && bcOrderData.length && bcOrderData.width && bcOrderData.quantity) {
        document.getElementById('bc-btn-calculate').style.display = 'block';
    } else {
        document.getElementById('bc-btn-calculate').style.display = 'none';
    }
}

// Validate quantity for stickers
function validateQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (!quantityInput) return;
    
    const quantity = parseInt(quantityInput.value);
    const errorEl = document.getElementById('quantity-error');
    
    if (!quantity || quantity < 100) {
        if (errorEl) {
            errorEl.textContent = 'Quantity must be at least 100';
        }
        quantityInput.classList.add('error');
        orderData.quantity = null;
    } else {
        if (errorEl) {
            errorEl.textContent = '';
        }
        quantityInput.classList.remove('error');
        orderData.quantity = quantity;
    }
    
    // Check if calculate button should be shown
    if (orderData.paperType && orderData.length && orderData.width && orderData.quantity) {
        document.getElementById('btn-calculate').style.display = 'block';
    } else {
        document.getElementById('btn-calculate').style.display = 'none';
    }
}

// Validate quantity for business cards
function validateBCQuantity() {
    const quantityInput = document.getElementById('bc-quantity');
    if (!quantityInput) return;
    
    const quantity = parseInt(quantityInput.value);
    let errorEl = document.getElementById('bc-quantity-error');
    
    if (!errorEl && quantityInput) {
        const formGroup = quantityInput.closest('.form-group');
        if (formGroup) {
            errorEl = document.createElement('span');
            errorEl.className = 'error-message';
            errorEl.id = 'bc-quantity-error';
            formGroup.appendChild(errorEl);
        }
    }
    
    if (!quantity || quantity < 100) {
        if (errorEl) {
            errorEl.textContent = 'Quantity must be at least 100';
        }
        quantityInput.classList.add('error');
        bcOrderData.quantity = null;
    } else {
        if (errorEl) {
            errorEl.textContent = '';
        }
        quantityInput.classList.remove('error');
        bcOrderData.quantity = quantity;
    }
    
    // Check if calculate button should be shown
    if (bcOrderData.paperType && bcOrderData.length && bcOrderData.width && bcOrderData.quantity) {
        document.getElementById('bc-btn-calculate').style.display = 'block';
    } else {
        document.getElementById('bc-btn-calculate').style.display = 'none';
    }
}

// Select design option for stickers
function selectDesignOption(hasDesign) {
    orderData.hasDesign = hasDesign;
    document.getElementById('btn-has-design').classList.toggle('active', hasDesign);
    document.getElementById('btn-no-design').classList.toggle('active', !hasDesign);
}

// Select design option for business cards
function selectBCDesignOption(hasDesign) {
    bcOrderData.hasDesign = hasDesign;
    document.getElementById('bc-btn-has-design').classList.toggle('active', hasDesign);
    document.getElementById('bc-btn-no-design').classList.toggle('active', !hasDesign);
}

// Select paper from dropdown for stickers
function selectPaperFromDropdown() {
    const paperType = document.getElementById('paper-format').value;
    if (!paperType) {
        document.getElementById('product-details').style.display = 'none';
        document.getElementById('pricing-info').style.display = 'none';
        document.getElementById('btn-calculate').style.display = 'none';
        return;
    }
    
    orderData.paperType = paperType;
    const pricing = paperPricing[paperType];
    
    // Store product details but keep hidden initially
    document.getElementById('product-description').textContent = pricing.description;
    const featuresList = document.getElementById('product-features');
    featuresList.innerHTML = '';
    pricing.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    document.getElementById('product-details').style.display = 'none';
    
    // Show "View Product Details" button
    document.getElementById('btn-view-details').style.display = 'block';
    
    // Show pricing info
    document.getElementById('price-first').textContent = `Rs ${pricing.first}`;
    document.getElementById('price-addon').textContent = `Rs ${pricing.addon}`;
    document.getElementById('pricing-info').style.display = 'block';
    
    // Show calculate button if all required fields are filled
    if (orderData.length && orderData.width && orderData.quantity) {
        document.getElementById('btn-calculate').style.display = 'block';
    }
}

// Toggle product details
function toggleProductDetails() {
    const productDetails = document.getElementById('product-details');
    const viewDetailsText = document.getElementById('view-details-text');
    const viewDetailsIcon = document.getElementById('view-details-icon');
    
    if (productDetails.style.display === 'none' || !productDetails.style.display) {
        productDetails.style.display = 'block';
        viewDetailsText.textContent = 'Hide Product Details';
        viewDetailsIcon.textContent = '▲';
    } else {
        productDetails.style.display = 'none';
        viewDetailsText.textContent = 'View Product Details';
        viewDetailsIcon.textContent = '▼';
    }
}

// Select paper from dropdown for business cards
function selectBCPaperFromDropdown() {
    const paperType = document.getElementById('bc-paper-format').value;
    if (!paperType) {
        document.getElementById('bc-product-details').style.display = 'none';
        document.getElementById('bc-btn-view-details').style.display = 'none';
        document.getElementById('bc-pricing-info').style.display = 'none';
        document.getElementById('bc-btn-calculate').style.display = 'none';
        return;
    }
    
    bcOrderData.paperType = paperType;
    const pricing = bcPaperPricing[paperType];
    
    // Store product details but keep hidden initially
    document.getElementById('bc-product-description').textContent = pricing.description;
    const featuresList = document.getElementById('bc-product-features');
    featuresList.innerHTML = '';
    pricing.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    document.getElementById('bc-product-details').style.display = 'none';
    
    // Show "View Product Details" button
    document.getElementById('bc-btn-view-details').style.display = 'block';
    
    // Show pricing info
    document.getElementById('bc-price-first').textContent = `Rs ${pricing.first}`;
    document.getElementById('bc-price-addon').textContent = `Rs ${pricing.addon}`;
    document.getElementById('bc-pricing-info').style.display = 'block';
    
    // Check if calculate button should be shown
    if (bcOrderData.length && bcOrderData.width && bcOrderData.quantity) {
        document.getElementById('bc-btn-calculate').style.display = 'block';
    } else {
        document.getElementById('bc-btn-calculate').style.display = 'none';
    }
}

// Toggle product details for business cards
function toggleBCProductDetails() {
    const productDetails = document.getElementById('bc-product-details');
    const viewDetailsText = document.getElementById('bc-view-details-text');
    const viewDetailsIcon = document.getElementById('bc-view-details-icon');
    
    if (productDetails.style.display === 'none' || !productDetails.style.display) {
        productDetails.style.display = 'block';
        viewDetailsText.textContent = 'Hide Product Details';
        viewDetailsIcon.textContent = '▲';
    } else {
        productDetails.style.display = 'none';
        viewDetailsText.textContent = 'View Product Details';
        viewDetailsIcon.textContent = '▼';
    }
}

// Calculate price for stickers
function calculatePrice() {
    // Validate quantity
    const quantity = parseInt(document.getElementById('quantity').value);
    if (!quantity || quantity < 100) {
        const errorEl = document.getElementById('quantity-error');
        const inputEl = document.getElementById('quantity');
        if (errorEl) {
            errorEl.textContent = 'Quantity must be at least 100';
        }
        if (inputEl) {
            inputEl.classList.add('error');
        }
        return;
    }
    
    if (!orderData.length || !orderData.width || !orderData.quantity || !orderData.paperType) {
        return;
    }
    
    // Convert dimensions to mm for calculations
    let lengthMm = orderData.length;
    let widthMm = orderData.width;
    
    if (orderData.unit === 'inch') {
        lengthMm = inchToMm(lengthMm);
        widthMm = inchToMm(widthMm);
    }
    
    // Convert paper size to mm
    const paperWidthMm = inchToMm(PAPER_WIDTH_INCH);
    const paperHeightMm = inchToMm(PAPER_HEIGHT_INCH);
    
    // Calculate stickers per sheet (with 2mm spacing)
    const stickerLengthWithSpacing = lengthMm + SPACING_MM;
    const stickerWidthWithSpacing = widthMm + SPACING_MM;
    
    const stickersPerRow = Math.floor(paperWidthMm / stickerLengthWithSpacing);
    const rows = Math.floor(paperHeightMm / stickerWidthWithSpacing);
    
    const stickersPerSheet = stickersPerRow * rows;
    
    // Calculate sheets required
    const sheetsRequired = Math.ceil(orderData.quantity / stickersPerSheet);
    
    // Calculate cost
    const pricing = paperPricing[orderData.paperType];
    let totalCost = pricing.first;
    if (sheetsRequired > 1) {
        totalCost += (sheetsRequired - 1) * pricing.addon;
    }
    
    // Apply bulk discount if total cost >= 3000
    let discountAmount = 0;
    let finalTotal = totalCost;
    if (totalCost >= 3000) {
        discountAmount = Math.round(totalCost * 0.17);
        finalTotal = totalCost - discountAmount;
    }
    orderData.discountAmount = discountAmount;
    orderData.finalTotal = finalTotal;
    
    // Store results
    orderData.stickersPerSheet = stickersPerSheet;
    orderData.stickersPerRow = stickersPerRow;
    orderData.rows = rows;
    orderData.sheetsRequired = sheetsRequired;
    orderData.totalCost = totalCost;
    
    // Display results
    document.getElementById('result-stickers-per-sheet').textContent = stickersPerSheet;
    document.getElementById('result-sheets').textContent = sheetsRequired;
    
    document.getElementById('cost-sheets').textContent = sheetsRequired;
    document.getElementById('cost-total').textContent = `Rs ${totalCost}`;
    if (discountAmount > 0) {
        document.getElementById('cost-grand-total').textContent = `Rs ${finalTotal}`;
        // Add discount display if not exists
        let discountRow = document.querySelector('.discount-row');
        if (!discountRow) {
            const costSection = document.getElementById('cost-breakdown-section');
            const grandTotalRow = costSection.querySelector('.grand-total');
            const discountHtml = `<div class="info-row discount-row" style="color: var(--success-color);">
                <span>Bulk Discount (17%):</span>
                <span>-Rs ${discountAmount}</span>
            </div>`;
            grandTotalRow.insertAdjacentHTML('beforebegin', discountHtml);
        }
    } else {
        document.getElementById('cost-grand-total').textContent = `Rs ${totalCost}`;
        // Remove discount row if exists
        const discountRow = document.querySelector('.discount-row');
        if (discountRow) discountRow.remove();
    }
    
    // Show sections
    document.getElementById('layout-info-section').style.display = 'block';
    document.getElementById('cost-breakdown-section').style.display = 'block';
    document.getElementById('action-buttons').style.display = 'grid';
    
    // Scroll to cost breakdown section
    setTimeout(() => {
        const costSection = document.getElementById('cost-breakdown-section');
        if (costSection) {
            costSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
}

// Calculate price for business cards
function calculateBCPrice() {
    // Validate quantity
    const quantity = parseInt(document.getElementById('bc-quantity').value);
    if (!quantity || quantity < 100) {
        let errorEl = document.getElementById('bc-quantity-error');
        const inputEl = document.getElementById('bc-quantity');
        
        if (!errorEl && inputEl) {
            const formGroup = inputEl.closest('.form-group');
            if (formGroup) {
                errorEl = document.createElement('span');
                errorEl.className = 'error-message';
                errorEl.id = 'bc-quantity-error';
                formGroup.appendChild(errorEl);
            }
        }
        
        if (errorEl) {
            errorEl.textContent = 'Quantity must be at least 100';
        }
        if (inputEl) {
            inputEl.classList.add('error');
        }
        return;
    }
    
    if (!bcOrderData.length || !bcOrderData.width || !bcOrderData.quantity || !bcOrderData.paperType) {
        return;
    }
    
    // Convert dimensions to mm for calculations
    let lengthMm = bcOrderData.length;
    let widthMm = bcOrderData.width;
    
    if (bcOrderData.unit === 'inch') {
        lengthMm = inchToMm(lengthMm);
        widthMm = inchToMm(widthMm);
    }
    
    // Convert paper size to mm
    const paperWidthMm = inchToMm(PAPER_WIDTH_INCH);
    const paperHeightMm = inchToMm(PAPER_HEIGHT_INCH);
    
    // Calculate cards per sheet (with 2mm spacing)
    const cardLengthWithSpacing = lengthMm + SPACING_MM;
    const cardWidthWithSpacing = widthMm + SPACING_MM;
    
    const cardsPerRow = Math.floor(paperWidthMm / cardLengthWithSpacing);
    const rows = Math.floor(paperHeightMm / cardWidthWithSpacing);
    
    const cardsPerSheet = cardsPerRow * rows;
    
    // Calculate sheets required
    const sheetsRequired = Math.ceil(bcOrderData.quantity / cardsPerSheet);
    
    // Calculate cost
    const pricing = bcPaperPricing[bcOrderData.paperType];
    let totalCost = pricing.first;
    if (sheetsRequired > 1) {
        totalCost += (sheetsRequired - 1) * pricing.addon;
    }
    
    // Apply bulk discount if total cost >= 3000
    let discountAmount = 0;
    let finalTotal = totalCost;
    if (totalCost >= 3000) {
        discountAmount = Math.round(totalCost * 0.17);
        finalTotal = totalCost - discountAmount;
    }
    bcOrderData.discountAmount = discountAmount;
    bcOrderData.finalTotal = finalTotal;
    
    // Store results
    bcOrderData.cardsPerSheet = cardsPerSheet;
    bcOrderData.cardsPerRow = cardsPerRow;
    bcOrderData.rows = rows;
    bcOrderData.sheetsRequired = sheetsRequired;
    bcOrderData.totalCost = totalCost;
    
    // Display results
    document.getElementById('bc-result-cards-per-sheet').textContent = cardsPerSheet;
    document.getElementById('bc-result-cards-per-row').textContent = cardsPerRow;
    document.getElementById('bc-result-rows').textContent = rows;
    document.getElementById('bc-result-sheets').textContent = sheetsRequired;
    
    document.getElementById('bc-cost-sheets').textContent = sheetsRequired;
    document.getElementById('bc-cost-price-per-sheet').textContent = 
        sheetsRequired === 1 ? `Rs ${pricing.first}` : `Rs ${pricing.first} (first) + Rs ${pricing.addon} × ${sheetsRequired - 1}`;
    document.getElementById('bc-cost-total').textContent = `Rs ${totalCost}`;
    if (discountAmount > 0) {
        document.getElementById('bc-cost-grand-total').textContent = `Rs ${finalTotal}`;
        // Add discount display if not exists
        let discountRow = document.querySelector('.bc-discount-row');
        if (!discountRow) {
            const costSection = document.getElementById('bc-cost-breakdown-section');
            const grandTotalRow = costSection.querySelector('.grand-total');
            const discountHtml = `<div class="info-row bc-discount-row" style="color: var(--success-color);">
                <span>Bulk Discount (17%):</span>
                <span>-Rs ${discountAmount}</span>
            </div>`;
            grandTotalRow.insertAdjacentHTML('beforebegin', discountHtml);
        }
    } else {
        document.getElementById('bc-cost-grand-total').textContent = `Rs ${totalCost}`;
        // Remove discount row if exists
        const discountRow = document.querySelector('.bc-discount-row');
        if (discountRow) discountRow.remove();
    }
    
    // Show sections
    document.getElementById('bc-layout-info-section').style.display = 'block';
    document.getElementById('bc-cost-breakdown-section').style.display = 'block';
    document.getElementById('bc-action-buttons').style.display = 'grid';
    
    // Scroll to cost breakdown section
    setTimeout(() => {
        const costSection = document.getElementById('bc-cost-breakdown-section');
        if (costSection) {
            costSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 100);
}

// Reset calculation for stickers
function resetCalculation() {
    document.getElementById('layout-info-section').style.display = 'none';
    document.getElementById('cost-breakdown-section').style.display = 'none';
    document.getElementById('action-buttons').style.display = 'none';
    document.getElementById('btn-calculate').style.display = 'none';
}

// Reset calculation for business cards
function resetBCCalculation() {
    document.getElementById('bc-layout-info-section').style.display = 'none';
    document.getElementById('bc-cost-breakdown-section').style.display = 'none';
    document.getElementById('bc-action-buttons').style.display = 'none';
    document.getElementById('bc-btn-calculate').style.display = 'none';
}

// Proceed to order form for stickers
function proceedToOrder() {
    document.getElementById('stickers-page').classList.remove('active');
    document.getElementById('order-page').classList.add('active');
    window.currentOrderType = 'stickers';
    displayOrderSummary();
    loadSavedCustomerData();
}

// Proceed to order form for business cards
function proceedToBCOrder() {
    document.getElementById('business-card-page').classList.remove('active');
    document.getElementById('order-page').classList.add('active');
    window.currentOrderType = 'business-card';
    displayOrderSummary();
    loadSavedCustomerData();
}

// Display order summary
function displayOrderSummary() {
    const summaryContent = document.getElementById('order-summary-content');
    let orderDataToUse = {};
    let pricing = {};
    
    if (window.currentOrderType === 'stickers') {
        orderDataToUse = orderData;
        pricing = paperPricing[orderData.paperType];
    } else if (window.currentOrderType === 'business-card') {
        orderDataToUse = bcOrderData;
        pricing = bcPaperPricing[bcOrderData.paperType];
    }
    
    const finalTotal = orderDataToUse.finalTotal || orderDataToUse.totalCost;
    const discountAmount = orderDataToUse.discountAmount || 0;
    
    let html = '';
    if (window.currentOrderType === 'stickers') {
        html = `
            <div class="order-summary-item">
                <span>Type:</span>
                <span>Stickers</span>
            </div>
            <div class="order-summary-item">
                <span>Size:</span>
                <span>${orderDataToUse.length} ${orderDataToUse.unit} × ${orderDataToUse.width} ${orderDataToUse.unit}</span>
            </div>
            <div class="order-summary-item">
                <span>Quantity:</span>
                <span>${orderDataToUse.quantity}</span>
            </div>
            <div class="order-summary-item">
                <span>Paper Type:</span>
                <span>${pricing.name}</span>
            </div>
            <div class="order-summary-item">
                <span>Sheets:</span>
                <span>${orderDataToUse.sheetsRequired}</span>
            </div>
        `;
    } else {
        html = `
            <div class="order-summary-item">
                <span>Type:</span>
                <span>Artboard/Artpaper</span>
            </div>
            <div class="order-summary-item">
                <span>Size:</span>
                <span>${orderDataToUse.length} ${orderDataToUse.unit} × ${orderDataToUse.width} ${orderDataToUse.unit}</span>
            </div>
            <div class="order-summary-item">
                <span>Quantity:</span>
                <span>${orderDataToUse.quantity}</span>
            </div>
            <div class="order-summary-item">
                <span>Paper Type:</span>
                <span>${pricing.name}</span>
            </div>
            <div class="order-summary-item">
                <span>Sheets:</span>
                <span>${orderDataToUse.sheetsRequired}</span>
            </div>
        `;
    }
    
    html += `
        <div class="order-summary-item">
            <span>Subtotal:</span>
            <span>Rs ${orderDataToUse.totalCost}</span>
        </div>
    `;
    
    if (discountAmount > 0) {
        html += `
            <div class="order-summary-item">
                <span>Discount (17%):</span>
                <span style="color: var(--success-color);">-Rs ${discountAmount}</span>
            </div>
        `;
    }
    
    html += `
        <div class="order-summary-item order-summary-total">
            <span>Total:</span>
            <strong>Rs ${finalTotal}</strong>
        </div>
    `;
    
    summaryContent.innerHTML = html;
}

// Load saved customer data
function loadSavedCustomerData() {
    const savedName = localStorage.getItem('shaikgraphix_customer_name');
    const savedPhone = localStorage.getItem('shaikgraphix_customer_phone');
    
    if (savedName) {
        document.getElementById('customer-name').value = savedName;
    }
    if (savedPhone) {
        document.getElementById('customer-phone').value = savedPhone;
    }
}

// Save customer data
function saveCustomerData(name, phone) {
    localStorage.setItem('shaikgraphix_customer_name', name);
    localStorage.setItem('shaikgraphix_customer_phone', phone);
}

// Validation functions
function validateName() {
    const name = document.getElementById('customer-name').value.trim();
    const errorEl = document.getElementById('name-error');
    const inputEl = document.getElementById('customer-name');
    
    if (!name) {
        errorEl.textContent = 'Name is required';
        inputEl.classList.add('error');
        return false;
    } else {
        errorEl.textContent = '';
        inputEl.classList.remove('error');
        return true;
    }
}

function validatePhone() {
    const phone = document.getElementById('customer-phone').value.trim();
    const errorEl = document.getElementById('phone-error');
    const inputEl = document.getElementById('customer-phone');
    
    if (!phone) {
        errorEl.textContent = 'Phone number is required';
        inputEl.classList.add('error');
        return false;
    } else if (phone.length !== 10 || !/^\d+$/.test(phone)) {
        errorEl.textContent = 'Phone number must be 10 digits';
        inputEl.classList.add('error');
        return false;
    } else {
        errorEl.textContent = '';
        inputEl.classList.remove('error');
        return true;
    }
}


// Go back to results
function goBackToResults() {
    document.getElementById('order-page').classList.remove('active');
    if (window.currentOrderType === 'stickers') {
        document.getElementById('stickers-page').classList.add('active');
    } else if (window.currentOrderType === 'business-card') {
        document.getElementById('business-card-page').classList.add('active');
    }
}

// Submit order
function submitOrder(event) {
    event.preventDefault();
    
    // Validate form
    const isNameValid = validateName();
    const isPhoneValid = validatePhone();
    const deliveryAddress = document.getElementById('delivery-address').value.trim();
    const addressError = document.getElementById('address-error');
    const addressInput = document.getElementById('delivery-address');
    
    let isAddressValid = true;
    if (!deliveryAddress) {
        addressError.textContent = 'Delivery address is required';
        addressInput.classList.add('error');
        isAddressValid = false;
    } else {
        addressError.textContent = '';
        addressInput.classList.remove('error');
    }
    
    if (!isNameValid || !isPhoneValid || !isAddressValid) {
        return;
    }
    
    const customerName = document.getElementById('customer-name').value.trim();
    const customerPhone = document.getElementById('customer-phone').value.trim();
    const gstName = document.getElementById('gst-name').value.trim();
    const additionalNotes = document.getElementById('additional-notes').value.trim();
    
    // Save customer data
    saveCustomerData(customerName, customerPhone);
    
    let orderSummary = '';
    let orderDataToUse = {};
    let pricing = {};
    
    if (window.currentOrderType === 'stickers') {
        orderDataToUse = orderData;
        pricing = paperPricing[orderData.paperType];
        orderSummary = `🎨 *ShaikGraphix Order - Stickers*

*Order Details:*
• Sticker Size: ${orderData.length} ${orderData.unit} × ${orderData.width} ${orderData.unit}
• Quantity: ${orderData.quantity} stickers
• Paper Type: ${pricing.name}
• Sheets Required: ${orderData.sheetsRequired}
• Stickers per Sheet: ${orderData.stickersPerSheet}
• Layout: ${orderData.stickersPerRow} per row × ${orderData.rows} rows`;
    } else if (window.currentOrderType === 'business-card') {
        orderDataToUse = bcOrderData;
        pricing = bcPaperPricing[bcOrderData.paperType];
        orderSummary = `📄 *ShaikGraphix Order - Artboard/Artpaper Printing*

*Order Details:*
• Size: ${bcOrderData.length} ${bcOrderData.unit} × ${bcOrderData.width} ${bcOrderData.unit}
• Quantity: ${bcOrderData.quantity} pieces
• Paper Type: ${pricing.name}
• Sheets Required: ${bcOrderData.sheetsRequired}
• Cards per Sheet: ${bcOrderData.cardsPerSheet}
• Layout: ${bcOrderData.cardsPerRow} per row × ${bcOrderData.rows} rows`;
    }
    
    const finalTotal = orderDataToUse.finalTotal || orderDataToUse.totalCost;
    const discountAmount = orderDataToUse.discountAmount || 0;
    
    orderSummary += `

*Pricing:*
• Subtotal: Rs ${orderDataToUse.totalCost}`;
    
    if (discountAmount > 0) {
        orderSummary += `
• Bulk Discount (17%): -Rs ${discountAmount}`;
    }
    
    orderSummary += `
• Total Cost: Rs ${finalTotal}

*Customer Information:*
• Name: ${customerName}
• Phone: ${customerPhone}
• Address: ${deliveryAddress}
${gstName ? `• GST/Business Name: ${gstName}` : ''}
${additionalNotes ? `• Notes: ${additionalNotes}` : ''}

*Payment:*
• Method: GPay
• Number: 9790282434
• Name: SHAFEEKA

Please confirm this order.`;
    
    // Encode for WhatsApp
    const whatsappNumber = '919042251453';
    const encodedMessage = encodeURIComponent(orderSummary);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Download Order Summary as PDF
function downloadOrderPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    let orderDataToUse = {};
    let pricing = {};
    
    if (window.currentOrderType === 'stickers') {
        orderDataToUse = orderData;
        pricing = paperPricing[orderData.paperType];
    } else if (window.currentOrderType === 'business-card') {
        orderDataToUse = bcOrderData;
        pricing = bcPaperPricing[bcOrderData.paperType];
    }
    
    const finalTotal = orderDataToUse.finalTotal || orderDataToUse.totalCost;
    const discountAmount = orderDataToUse.discountAmount || 0;
    
    // Set up colors - dark brown (#64494f = rgb(100, 73, 79))
    const darkBrown = [100, 73, 79];
    const lightGrey = [240, 240, 240];
    
    // Draw white card background with rounded corners effect
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(15, 15, 180, 100, 3, 3, 'F');
    
    // Title - Order Summary in dark brown, bold
    doc.setFontSize(18);
    doc.setTextColor(...darkBrown);
    doc.setFont(undefined, 'bold');
    doc.text('Order Summary', 105, 30, { align: 'center' });
    
    // Draw line under title
    doc.setDrawColor(...darkBrown);
    doc.setLineWidth(0.5);
    doc.line(25, 35, 185, 35);
    
    // Start position for content
    let yPos = 45;
    const lineHeight = 7;
    const leftMargin = 25;
    
    // Set normal font
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    
    // Type
    doc.text('Type:', leftMargin, yPos);
    doc.setFont(undefined, 'bold');
    const typeText = window.currentOrderType === 'stickers' ? 'Stickers' : 'Artboard/Artpaper Printing';
    doc.text(typeText, leftMargin + 30, yPos);
    doc.setFont(undefined, 'normal');
    yPos += lineHeight;
    
    // Draw separator line
    doc.setDrawColor(lightGrey[0], lightGrey[1], lightGrey[2]);
    doc.setLineWidth(0.3);
    doc.line(leftMargin, yPos - 2, 185, yPos - 2);
    
    // Size
    doc.text('Size:', leftMargin, yPos);
    doc.setFont(undefined, 'bold');
    doc.text(`${orderDataToUse.length} ${orderDataToUse.unit} × ${orderDataToUse.width} ${orderDataToUse.unit}`, leftMargin + 30, yPos);
    doc.setFont(undefined, 'normal');
    yPos += lineHeight;
    doc.line(leftMargin, yPos - 2, 185, yPos - 2);
    
    // Quantity
    doc.text('Quantity:', leftMargin, yPos);
    doc.setFont(undefined, 'bold');
    doc.text(`${orderDataToUse.quantity}`, leftMargin + 30, yPos);
    doc.setFont(undefined, 'normal');
    yPos += lineHeight;
    doc.line(leftMargin, yPos - 2, 185, yPos - 2);
    
    // Paper Type
    doc.text('Paper Type:', leftMargin, yPos);
    doc.setFont(undefined, 'bold');
    doc.text(pricing.name, leftMargin + 30, yPos);
    doc.setFont(undefined, 'normal');
    yPos += lineHeight;
    doc.line(leftMargin, yPos - 2, 185, yPos - 2);
    
    // Sheets
    doc.text('Sheets:', leftMargin, yPos);
    doc.setFont(undefined, 'bold');
    doc.text(`${orderDataToUse.sheetsRequired}`, leftMargin + 30, yPos);
    doc.setFont(undefined, 'normal');
    yPos += lineHeight;
    doc.line(leftMargin, yPos - 2, 185, yPos - 2);
    
    // Subtotal
    doc.text('Subtotal:', leftMargin, yPos);
    doc.setFont(undefined, 'bold');
    doc.text(`Rs ${orderDataToUse.totalCost}`, leftMargin + 30, yPos);
    doc.setFont(undefined, 'normal');
    yPos += lineHeight;
    
    // Discount if applicable
    if (discountAmount > 0) {
        doc.line(leftMargin, yPos - 2, 185, yPos - 2);
        doc.text('Discount (17%):', leftMargin, yPos);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(16, 185, 129); // Green for discount
        doc.text(`-Rs ${discountAmount}`, leftMargin + 30, yPos);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        yPos += lineHeight;
    }
    
    // Draw dark brown line before total
    doc.setDrawColor(...darkBrown);
    doc.setLineWidth(0.5);
    doc.line(leftMargin, yPos + 2, 185, yPos + 2);
    yPos += lineHeight + 3;
    
    // Total - bold, dark brown, right aligned
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...darkBrown);
    doc.text('Total:', leftMargin, yPos);
    doc.text(`Rs ${finalTotal}`, 185, yPos, { align: 'right' });
    
    // Save PDF
    const fileName = `ShaikGraphix_Order_${Date.now()}.pdf`;
    doc.save(fileName);
}

// Add event listeners for real-time validation
document.addEventListener('DOMContentLoaded', function() {
    // Stickers
    const lengthInput = document.getElementById('length');
    const widthInput = document.getElementById('width');
    const quantityInput = document.getElementById('quantity');
    
    if (lengthInput) {
        lengthInput.addEventListener('input', function() {
            validateDimensions();
            if (orderData.paperType && orderData.length && orderData.width && orderData.quantity) {
                document.getElementById('btn-calculate').style.display = 'block';
            }
        });
    }
    
    if (widthInput) {
        widthInput.addEventListener('input', function() {
            validateDimensions();
            if (orderData.paperType && orderData.length && orderData.width && orderData.quantity) {
                document.getElementById('btn-calculate').style.display = 'block';
            }
        });
    }
    
    if (quantityInput) {
        quantityInput.addEventListener('input', function() {
            validateQuantity();
            if (orderData.paperType && orderData.length && orderData.width && orderData.quantity) {
                document.getElementById('btn-calculate').style.display = 'block';
            }
        });
    }
    
    // Business Cards
    const bcLengthInput = document.getElementById('bc-length');
    const bcWidthInput = document.getElementById('bc-width');
    const bcQuantityInput = document.getElementById('bc-quantity');
    
    if (bcLengthInput) {
        bcLengthInput.addEventListener('input', function() {
            validateBCDimensions();
        });
    }
    
    if (bcWidthInput) {
        bcWidthInput.addEventListener('input', function() {
            validateBCDimensions();
        });
    }
    
    if (bcQuantityInput) {
        bcQuantityInput.addEventListener('input', function() {
            validateBCQuantity();
        });
    }
});


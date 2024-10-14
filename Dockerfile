FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    libzip-dev \
    curl

# Install Node.js and pnpm
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g pnpm

# Install PHP extensions
RUN docker-php-ext-install \
    pdo_mysql \
    intl \
    zip

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set working directory
WORKDIR /var/www/html

# Copy existing application directory contents
COPY . /var/www/html

# Install dependencies
RUN composer install --no-scripts --no-autoloader

# Generate autoloader and run scripts
RUN composer dump-autoload --optimize && composer run-script post-install-cmd

# Install pnpm dependencies
RUN pnpm install

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/var

# Configure Apache for Symfony
COPY apache.conf /etc/apache2/sites-available/000-default.conf
RUN a2ensite 000-default.conf

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

# Expose port 80
EXPOSE 80

# Set the entrypoint
ENTRYPOINT ["docker-entrypoint"]

# Start Apache
CMD ["apache2-foreground"]
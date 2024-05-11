#  DATABASE_URI=postgres://avnadmin:AVNS_HwvX939fS7ZLQcMiQqH@mydb-haileiyesus29-7b18.e.aivencloud.com:18166/chatapp?sslmode=require

# NODE_ENV=development
# PORT=5000

# CLIENTS_URL=http://localhost:5500

# JWT_SECRET_KEY=473ee6186cdd0d84c8119f160907db18
# JWT_REFRESH_KEY=7b18e473ee6186cdd0d84c8119f1609

# # cloudinary
# CLOUDINARY_CLOUD_NAME=dcxo62uqm
# CLOUDINARY_API_KEY=387725997773486
# CLOUDINARY_API_SECRET=yI9eG1We47FqQDu2TK3B5L1vNBg

docker build -t chatapp . && docker run -d -p 5000:5000 --name chatapp-api -e DATABASE_URL=postgres://avnadmin:AVNS_HwvX939fS7ZLQcMiQqH@mydb-haileiyesus29-7b18.e.aivencloud.com:18166/chatapp?sslmode=require -e NODE_ENV=development -e PORT=5000 -e CLIENTS_URL=http://localhost:5500 -e JWT_SECRET_KEY=473ee6186cdd0d84c8119f160907db18 -e JWT_REFRESH_KEY=7b18e473ee6186cdd0d84c8119f1609 -e CLOUDINARY_CLOUD_NAME=dcxo62uqm -e CLOUDINARY_API_KEY=387725997773486 -e CLOUDINARY_API_SECRET=yI9eG1We47FqQDu2TK3B5L1vNBg chatapp

gen-openapi:
	go run scripts/main.go
	cd app && yarn run orval
db-orm:
	cd backend && yarn run db:migrate:gen && yarn run db:migrate:apply
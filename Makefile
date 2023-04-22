gen-openapi:
	go run scripts/main.go

db-orm:
	cd backend && yarn run db:migrate:gen && yarn run db:migrate:apply
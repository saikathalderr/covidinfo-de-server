build-image:
	docker image build . -t saikathalderr/covidinfo-de-server-img

run-image:
	docker run -p 4000:4000 saikathalderr/covidinfo-de-server-img

up-dev:
	docker-compose up --build

down-dev:
	docker-compose down
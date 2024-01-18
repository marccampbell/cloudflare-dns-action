.PHONY: package-all
package-all: package-create-dns-record package-get-dns-record

.PHONY: package-create-dns-record
package-create-dns-record:
	rm -rf ./create-dns-record/build ./create-dns-record/dist ./create-dns-receord/node_modules
	cd ./create-dns-record && npm install && npm run build && npm run package

.PNONY: package-get-dns-record
package-get-dns-record:
	rm -rf ./get-dns-record/build ./get-dns-record/dist ./get-dns-record/node_modules
	cd ./get-dns-record && npm install && npm run build && npm run package

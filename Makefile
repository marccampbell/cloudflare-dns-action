.PHONY: package-all
package-all: package-create-dns-record

.PHONY: package-create-dns-record
package-create-dns-record:
	rm -rf ./create-dns-record/build ./create-dns-record/dist ./create-dns-receord/node_modules
	cd ./create-dns-record && npm install && npm run build && npm run package


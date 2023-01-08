# Sakai UI

## WARNING: THIS REPO IS UNDER CONSTRUCTION. IT WILL PROBABLY BE FORCE PUSHED !

All of Sakai's web components will be hosted in this monorepo. This gives us
several benefits:

* A single copy of shared node modules, at the top level, via Lerna's hoisting
approach
* Independent versioning of all the packages, using "version": "independent" in
lerna.json
* A single place to lint all the packages from.
* An easier developer experience across packages, using file linking.
* Easier testing, using the web test runner (Karma under the covers)

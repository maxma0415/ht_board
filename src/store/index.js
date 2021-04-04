/* eslint-disable no-console */
import Vue from 'vue';
import Vuex from 'vuex';
import RouteService from '@/services/route.services';
import UserService from '@/services/user.services';


Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        authError: null,
        isLoading: true,
        user: {
            isLoggedIn: false,
            id: '',
            username: '',
            email: ''
        },
        options: {
            victimGenderOptions: [
                'female',
                'male',
                'unknown'
            ],
            victimAgeRangeOptions: [
                'Below 12',
                '12 - 17',
                '18 - 24',
                '25 - 34',
                '35 - 44',
                '45 - 54',
                '55 - 64',
                '65 - 74',
                '75 and above'
            ],

            traffickingTypeOptions: [
                'Labour Exploitation',
                'Sexual Exploitation',
                'Child Labour',
                'Child Sexual Exploitation',
                'Child Marriage',
                'Child Trafficking',
                'Domestic Servitude',
                'Forced Criminality',
                'Forced Marriage',
                'Forced Marriage & Sexual Exploitation',
                'Forced Military Service',
                'Forced Pregnancy',
                'Illegal Adoption',
                'Organ Harvesting',
                'Other'
            ],

            traffickingSubTypeOptions: [
                'Accommodation/Hotel/Motel',
                'Agriculture/Farms/Animal Husbandry',
                'Amusement and Recreation',
                'Aquafarming/Fishing',
                'Arts & Entertainment',
                'Bar/Club/Hospitality',
                'Child Marriage',
                'Commercial Cleaning/Janitorial Services',
                'Construction',
                'Domestic Work',
                'Drug Cultivation',
                'Drug Supply/Trafficking',
                'Education',
                'Environmental/Forestry/Reforestation',
                'Food Processing/Packaging',
                'Forced Begging',
                'Health Care',
                'Health & Beauty Services',
                'Illicit Activities',
                'Landscaping',
                'Manfacturing/Factories',
                'Mining, Quarrying, Oil/Gas Extraction',
                'Personal Sexual Servitude',
                'Pornography',
                'Pre-School/Child Day Care Service',
                'Professional/Scientific/Tech Services',
                'Prostitution/Brothel/Escort Agency',
                'Online Sexual Exploitation',
                'Restaurant/Takeaway',
                'Retail',
                'Servitude',
                'Sexual Servitude',
                'Social Services Fraud',
                'Transportation',
                'Visa',
                'Other'

            ],

            countryOptions: [

            ],

            countryTypes: [
                'source',
                'destination',
                'transit'
            ]
        },

        filters: {

            animation: true,
            showRoutes: true,
            showHotSpots: true,
            selectedGender: [],
            selectedAgeRange: [],
            selectedStartDate: null,
            selectedEndDate: null,
            selectedTraffickingTypes: [],
            selectedTraffickingSubTypes: [],
            selectedCountries: [],
            selectedCountryTypes: [],
            asSource: true,
            asDestination: true,
            asTransit: true,

        },

        data: {
            routes: null,
            filteredRoutes: null,
            coordinates: null,
            countries: null,
            hotspots: null,
            map: {
                hotspots: null,
                coordinates: null,
            },
            summary: {
                startDate: null,
                endDate: null,
                numCases: 0
            },
            victims: {
                genders: null,
                ageRanges: null
            },
            traffickingTypes: {
                types: null
            }
        }

    },
    mutations: {
        setUser(state, user) {
            state.user.id = user.id
            state.user.username = user.username
            state.user.email = user.email
            state.user.isLoggedIn = user.isLoggedIn
        },

        setAuthError(state, authError) {
            state.authError = authError
        },
        clearAuthError(state) {
            state.authError = null
        },

        setIsLoading(state, option) {
            state.isLoading = option
        },

        /** Filter update mutations */
        setSelectedTraffickingTypes(state, types) {
            state.filters.selectedTraffickingTypes = types
        },
        setSelectedTraffickingSubTypes(state, types) {
            state.filters.selectedTraffickingSubTypes = types
        },
        setSelectedCountries(state, countries) {
            state.filters.selectedCountries = countries
        },

        setAnimation(state, option) {
            state.filters.animation = option
        },

        setShowRoutes(state, option) {
            state.filters.showRoutes = option
        },

        setShowHotSpots(state, option) {
            state.filters.showHotSpots = option
        },

        setSelectedStartDate(state, date) {
            state.filters.selectedStartDate = date
        },

        setSelectedEndDate(state, date) {
            state.filters.selectedEndDate = date
        },

        setAsSource(state, option) {
            state.filters.asSource = option
        },

        setAsDestination(state, option) {
            state.filters.asDestination = option
        },

        setAsTransit(state, option) {
            state.filters.asTransit = option
        },

        setSelectedGenderGroup(state, group) {
            state.filters.selectedGender = group
        },

        setSelectedAgeRange(state, group) {
            state.filters.selectedAgeRange = group
        },

        setSelectedCountryTypes(state, types) {
            state.filters.selectedCountryTypes = types
        },

        /** End - Filter update mutations */

        /** Data load mutations */
        setRoutes(state, routes) {
            state.data.routes = routes
        },
        setFilteredRoutes(state, routes) {
            state.data.filteredRoutes = routes
        },
        setCoordinates(state, coordinates) {
            state.data.coordinates = coordinates
        },
        // summary table data
        setStartDate(state, date) {
            state.data.summary.startDate = date
        },
        setEndDate(state, date) {
            state.data.summary.endDate = date
        },
        setNumCases(state, num) {
            state.data.summary.numCases = num
        },

        //victim card data
        setVictimGenders(state, data) {
            state.data.victims.genders = data
        },

        setVictimAgeRanges(state, data) {
            state.data.victims.ageRanges = data
        },
        setTraffickingTypes(state, data) {
            state.data.traffickingTypes.types = data
        },
        setHotSpots(state, data) {
            state.data.map.hotspots = data
        },
        setRoutesCoordinates(state, data) {
            state.data.map.coordinates = data
        },


        /* End - data load
         */

        /**
         * Option load
         */
        setCountryOptions(state, countries) {
            state.options.countryOptions = countries
        },
        setVictimAgeRangeOptions(state, ageRanges) {
            state.options.victimAgeRangeOptions = ageRanges
        },
        setVictimGenderOptions(state, genders) {
            state.options.victimGenderOptions = genders
        },
        setTraffickingTypeOptions(state, types) {
            state.options.traffickingTypeOptions = types
        },
        setTraffickingSubTypeOptions(state, types) {
            state.options.traffickingSubTypeOptions = types
        },


    },

    actions: {
        /**
         * User info 
         */

        async signIn({
            commit
        }, payload) {
            // commit('setLoading', true)
            commit('clearAuthError')
            let defaultCredentials = {
                'email': 'admin',
                'password': "123456"
            }

            if (payload.email === defaultCredentials['email'] && payload.password === defaultCredentials['password']){
                let newUser = {
                    id: "id123",
                    username: "admin",
                    email: "admin",
                    isLoggedIn: true
                }
                console.log("admin login")
                commit('setUser', newUser)
            } else {

                let response = await UserService.signInWithEmailAndPassword(payload.email, payload.password)
                //console.log(response)
                if (response.status === 200) {
                    response = response.data
                    let newUser = {
                        id: response.localId,
                        username: response.displayName,
                        email: response.email,
                        isLoggedIn: true
                    }
                    commit('setUser', newUser)
                } else {
                    let error = response.data.error
                    commit('setAuthError', error)
                }
            }

        },

        signOut({
            commit
        }) {
            let newUser = {
                id: '',
                username: '',
                email: '',
                isLoggedIn: false
            }
            commit('setUser', newUser)
        },
        updateSelectedTraffickingTypes({
            commit
        }, types) {
            //console.log('updating types in vuex')
            commit('setSelectedTraffickingTypes', types)
        },

        updateSelectedTraffickingSubTypes({
            commit
        }, types) {
            //console.log('updating sub types in vuex')
            commit('setSelectedTraffickingSubTypes', types)
        },
        updateSelectedCountries({
            commit
        }, countries) {
            //console.log('updating countries in vuex')
            commit('setSelectedCountries', countries)
        },

        updateAnimation({
            commit
        }, option) {
            // eslint-disable-next-line no-console
            //console.log('updating animation in vuex')
            commit('setAnimation', option)
        },
        updateShowRoutes({
            commit
        }, option) {
            // eslint-disable-next-line no-console
            //console.log('updating show routes in vuex')
            commit('setShowRoutes', option)
        },
        updateShowHotSpots({
            commit
        }, option) {
            // eslint-disable-next-line no-console
            //console.log('updating show hot spots in vuex')
            commit('setShowHotSpots', option)
        },

        updateSelectedStartDate({
            commit
        }, date) {
            commit('setSelectedStartDate', date);

        },

        updateSelectedEndDate({
            commit
        }, date) {
            commit('setSelectedEndDate', date);

        },

        updateAsSource({
            commit
        }, option) {
            commit('setAsSource', option)
        },

        updateAsDestination({
            commit
        }, option) {
            commit('setAsDestination', option)
        },

        updateAsTransit({
            commit
        }, option) {
            commit('setAsTransit', option)
        },

        updateSelectedGender({
            commit
        }, group) {
            //console.log('updating gender in vuex')
            commit('setSelectedGenderGroup', group)
        },

        updateSelectedAgeRange({
            commit
        }, group) {
            //console.log('updating age range in vuex')
            commit('setSelectedAgeRange', group)
        },

        updateSelectedCountryTypes({
            commit
        }, types) {
            //console.log('updating country types in vuex')
            commit('setSelectedCountryTypes', types)
        },

        updateIsLoading({
            commit
        }, option) {
            commit('setIsLoading', option);
        },

        async getRoutes({
            commit
        }) {
            const routes = await RouteService.getLocalSpotsRoutes();
            // eslint-disable-next-line no-console
            // //console.log(routes);
            commit('setRoutes', routes);

        },

        /**
         * Set Filter options that need to be populated
         * 1.StartDate (Optional)
         * 2. EndDate (Optional)
         * 3. traffickingTypeOptions
         * 4. traffickingSubTypeOptions
         * 5. victimGenderOptions - done
         * 6. victimAgeRangeOptions
         * 7. countryOptions - done
         * 
         */
        setOptions({
            commit
        }, data) {

            /** Country options */
            const countries = data.map(route => route.ctry)
            //flatten nested array
            let countryOptions = [].concat(...countries);
            //remove dupliacte value from array, filter out empty country name, sort in asc order
            countryOptions = [...new Set(countryOptions)].filter(country => country !== '').sort()


            // countryOptions = countryOptions.filter(country => country !== 'Kyrgyz Republic' && country !== 'Macedonia, FYR' && country !== 'Other' && country !== 'Slovak Republic')
            commit('setCountryOptions', countryOptions);

            /** victim gender options */
            let victimGenderOptions = data.map(route => route.victims.map(victim => victim.gender))
            victimGenderOptions = [].concat(...victimGenderOptions);
            victimGenderOptions = [...new Set(victimGenderOptions)].filter(gender => gender !== null).sort()
            commit('setVictimGenderOptions', victimGenderOptions);

            /** victim age range options */
            let victimAgeRangeOptions = data.map(route => route.victims.map(victim => victim.age))
            victimAgeRangeOptions = [].concat(...victimAgeRangeOptions);
            victimAgeRangeOptions = [...new Set(victimAgeRangeOptions)].filter(age => age !== null).sort()

            commit('setVictimAgeRangeOptions', victimAgeRangeOptions);

            /** trafficking type options */
            let typeOptions = data.map(route => route.traffick_type.map(type => type.type))
            typeOptions = [].concat(...typeOptions);
            typeOptions = [...new Set(typeOptions)].filter(type => type !== null).sort()
            commit('setTraffickingTypeOptions', typeOptions)

            /** trafficking sub type options */
            let subTypeOptions = data.map(route => route.traffick_type.map(type => type.subtype))
            subTypeOptions = [].concat(...subTypeOptions);
            subTypeOptions = [...new Set(subTypeOptions)].filter(type => type !== null).sort()
            commit('setTraffickingSubTypeOptions', subTypeOptions)

        },

        setInitialMapData({
            commit,

        }, data) {
            // pass in 2 sets of default data -->
            // 1. Pairs of corrinates [[from_long, from_lati],[],[to_long, to_lati]]
            // 2. country and num cases {name: "Country name", value: [longitude, latitude, num]}
            // let start = new Date().getTime();
            let countries = data.countryOptions;
            let coordinates = data.coordinates;
            let routes = data.routes;
            // let assignVariables = new Date().getTime();

            /**
             * Test chuncking array
             */

            // let numCountries = countries.length

            // // number of elements to process in a single chunk
            // const chunkSize = 43

            // let chunks = [] // holds our processing chunks

            // // used to print current chunk number
            // // let count = 0

            // while (numCountries) {
            //     let chunk = countries.splice(0, chunkSize) // grab a chunk

            //     // //console.log(`processing chunk ${++count}`)

            //     chunks.push(
            //         Promise.all( // returns an array of promises
            //             chunk.map(country => { // convert each elt to a Promise
            //                 // //console.log(`processing elt: ${country}`)
            //                 let countryCoordinates = country.includes('Hong Kong') ? coordinates.find(coordinate => coordinate.name === 'Hong Kong') : coordinates.find(coordinate => country.includes(coordinate.name));
            //                 let longitude = countryCoordinates.longitude;
            //                 let latitude = countryCoordinates.latitude;
            //                 let numCases = routes.filter(route => route.ctry.includes(country)).length
            //                 return new Promise((resolve, reject) => {
            //                     try {
            //                         return resolve({
            //                             name: country,
            //                             value: [
            //                                 longitude,
            //                                 latitude,
            //                                 numCases

            //                             ]
            //                         })
            //                         // return resolve(processElt(country))
            //                     } catch (err) {
            //                         return reject(err)
            //                     }
            //                 })
            //             })
            //         )
            //     )

            //     numCountries = countries.length // update number of elts left to process
            // }

            // // flatten array of arrays
            // //const flatten = arr => [].concat.apply([], arr)
            // let groupedHotSpots = await Promise.all(chunks);
            // groupedHotSpots = groupedHotSpots.flat()
            // //console.log(groupedHotSpots[0])
            // let chunkArrayPoint = new Date().getTime();
            // //console.log(`Duration of chunking hotspots: ${chunkArrayPoint - assignVariables}`)


            let groupedHotSpots = countries.map((country) => {
                /** Watch out - Hong Kong */
                let countryCoordinates = country.includes('Hong Kong') ? coordinates.find(coordinate => coordinate.name === 'Hong Kong') : coordinates.find(coordinate => country.includes(coordinate.name));
                let longitude = countryCoordinates.longitude;
                let latitude = countryCoordinates.latitude;
                let numCases = routes.filter(route => route.ctry.includes(country)).length
                return {
                    name: country,
                    value: [
                        longitude,
                        latitude,
                        numCases

                    ]
                }
            })
            // let mapHotSpots = new Date().getTime();
            //console.log(`Duration of mapping hotspots: ${mapHotSpots - assignVariables}`)
            //Show countries that have at least one case.
            groupedHotSpots = groupedHotSpots.filter(country => country.value[2] > 0)
            //Sort countries by num of cases.
            groupedHotSpots = groupedHotSpots.sort((a, b) => b.value[2] - a.value[2])
            // let filterSortHotSpots = new Date().getTime();
            //console.log(`Duration of filtering and sorting hotspots by # cases: ${filterSortHotSpots - mapHotSpots}`)
            let topHotSpots = groupedHotSpots

            //Filter routes that have at least 2 countries involved
            let routesCountries = routes.map(route => route.ctry).filter(country => country.length >= 2)
            // let filterMultipleCountriesPoint = new Date().getTime();
            //console.log(`Duration of filtering multiple countries: ${filterMultipleCountriesPoint - filterSortHotSpots}`)

            routesCountries = routesCountries.map(countries => countries.map((countryName) => {
                /** Watch out - Hong Kong SAR, China */
                let countryObj = countryName.includes('Hong Kong') ? coordinates.find(coordinate => coordinate.name === 'Hong Kong') : coordinates.find(coordinate => countryName.includes(coordinate.name));
                let longitude = countryObj.longitude;
                let latitude = countryObj.latitude;
                return {
                    coord: [
                        longitude,
                        latitude,
                    ]
                }
            }))
            // let mapRouteCoordinates = new Date().getTime();
            //console.log(`Duration of mappping coordinates: ${mapRouteCoordinates - filterMultipleCountriesPoint}`)

            commit('setHotSpots', topHotSpots);
            commit('setRoutesCoordinates', routesCountries)

            // let end = new Date().getTime();
            //console.log(`Duration of setting hotspots and coordinates: ${end - mapRouteCoordinates}`)
            //console.log(`Overall - set map data: ${end - start}`)


        },

        setVictims({
            commit,
            state
        }, victims) {
            // nationality: 
            // gender:
            // age: 
            let genderOptions = state.filters.selectedGender.length === 0 ? state.options.victimGenderOptions : state.filters.selectedGender;
            let ageGroupOptions = state.filters.selectedAgeRange.length === 0 ? state.options.victimAgeRangeOptions : state.filters.selectedAgeRange;
            // // eslint-disable-next-line no-console
            // //console.log(victims.length)
            // // eslint-disable-next-line no-console
            // //console.log(genderOptions)

            //Null value will not be counted
            let groupedGender = genderOptions.map((gender) => {
                return {
                    name: gender,
                    value: victims.filter(victim => victim.gender === gender).length
                }
            })
            groupedGender = groupedGender.filter(gender => gender.value > 0)

            let groupedAgeRanges = ageGroupOptions.map((age) => {
                return {
                    name: age,
                    value: victims.filter(victim => victim.age === age).length
                }
            })
            groupedAgeRanges = groupedAgeRanges.filter(age => age.value > 0)

            // //console.log(groupedGender)
            commit('setVictimGenders', groupedGender);

            // //console.log(groupedAgeRanges)
            commit('setVictimAgeRanges', groupedAgeRanges);

        },

        setTraffickingTypesData({
            commit,
            state
        }, data) {
            let typesOption = state.filters.selectedTraffickingTypes.length === 0 ? state.options.traffickingTypeOptions : state.filters.selectedTraffickingTypes;
            let groupedTypes = typesOption.map((type) => {
                return {
                    name: type,
                    value: data.filter(traffickingType => traffickingType === type).length
                }
            })
            groupedTypes = groupedTypes.filter(type => type.value > 0)

            if (groupedTypes.length >= 1) {
                groupedTypes = groupedTypes.sort((a, b) => b.value - a.value);
            }

            //top 5 groups
            if (groupedTypes.length >= 5) {
                groupedTypes = groupedTypes.slice(0, 5);
            }

            // //console.log(groupedTypes)
            commit('setTraffickingTypes', groupedTypes);
        },


        setInitialSummaryData({
            commit,
        }, data) {
            let sDate = data.map(result => result.sdate)
            sDate = sDate.filter(date => date !== null)
            let eDate = data.map(result => result.edate)
            eDate = eDate.filter(date => date !== null)
            let dates = [...sDate, ...eDate];
            let minDate = Math.min(...dates)
            let maxDate = Math.max(...dates)

            // eslint-disable-next-line no-console
            //console.log(minDate)
            // eslint-disable-next-line no-console
            //console.log(maxDate)

            /**set selected start date, if not set */
            //if (state.filters.selectedStartDate === null || state.filters.selectedEndDate === null) {
            commit('setSelectedStartDate', minDate);
            commit('setSelectedEndDate', maxDate)
            //}
            /** set start date */
            commit('setStartDate', minDate)
            /** set end date */
            commit('setEndDate', maxDate)
            /** set number of cases */
            commit('setNumCases', data.length)
        },

        setSummaryData({
            commit,
            state
        }, num) {
            // eslint-disable-next-line no-console
            //console.log(state.filters)
            commit('setStartDate', state.filters.selectedStartDate)
            /** set end date */
            commit('setEndDate', state.filters.selectedEndDate)
            /** set number of cases */
            commit('setNumCases', num)
        },

        async loadInitialData({
            commit,
            state,
            dispatch
        }) {

            // let start = new Date().getTime();

            commit('setIsLoading', true);
            // Retrieve data from (mock) api
            let data = await RouteService.getRoutesAndCoordinates();
            let routes = data[0];
            let coordinates = data[1];
            // let pointOne = new Date().getTime();
            //console.log(`Duration of api calling: ${pointOne - start}`)
            //Recode 'under 12 years old' to '11 or below'
            let recodedRoutes = routes.map((route) => {
                return {
                    ...route,
                    victims: route.victims.map((victim) => {
                            return {
                                ...victim,
                                age: victim.age === "Under 12 years old" ? '11 or younger' : victim.age,
                            }
                        }

                    )
                }
            })


            routes = recodedRoutes
            //console.log(routes.length)

            // Filter out invalid routes if
            // 1. timestamp is negative,
            // 2. timesteamp is future timestamp (> 300000000)
            // 3. route has default header as its values ('uiid': 'incident_id')
            // NUM - invalid 71, valid 43,542
            let maxDate = 3000000000000
            routes = routes.filter(route => {
                return !(
                    (route.sdate < 0 || route.edate < 0) ||
                    (route.sdate > maxDate || route.edate > maxDate) ||
                    (route.uiid === 'incident_id')
                )
            })
            /**
             * Bottleneck 3
             */
            // let pointTwo = new Date().getTime();
            //console.log(`Duration of filtering invalid dates: ${pointTwo - pointOne}`)
            //Remove routes that include invalid countries
            let invalidCountries = ['Kyrgyz Republic', 'Macedonia, FYR', 'Other', 'Slovak Republic', ''];
            routes = routes.filter(route => !(invalidCountries.includes(route.fctry) || invalidCountries.includes(route.tctry) || invalidCountries.includes(route.vctry1) || invalidCountries.includes(route.vctry2)))

            //console.log(routes.length)
            // let pointThree = new Date().getTime();
            //console.log(`Duration of filtering invalid countries: ${pointThree - pointTwo}`)

            let victims = routes.map(route => route.victims);
            victims = victims.flat()
            victims = victims.filter(victim => victim !== null)

            let traffickingTypes = routes.map(route => route.traffick_type.map(type => type.type));
            traffickingTypes = traffickingTypes.flat()
            traffickingTypes = traffickingTypes.filter(type => type !== null)

            // let pointFour = new Date().getTime();
            //console.log(`Duration of extracting victims and traffickingTypes: ${pointFour - pointThree}`)
            /**
             * Bottleneck 2 - 2s+
             */
            commit('setRoutes', routes);
            // let setRoutesPoint = new Date().getTime();
            //console.log(`Duration of setting routes: ${setRoutesPoint - pointFour}`)
            commit('setCoordinates', coordinates);
            // let setCoordinatesPoint = new Date().getTime();
            //console.log(`Duration of setting coors: ${setCoordinatesPoint - setRoutesPoint}`)
            dispatch('setOptions', routes)
            // let setOptionsPoint = new Date().getTime();
            //console.log(`Duration of setting options: ${setOptionsPoint - setCoordinatesPoint}`)
            dispatch('setInitialSummaryData', routes)
            // let setSummaryPoint = new Date().getTime();
            //console.log(`Duration of setting summary: ${setSummaryPoint - setOptionsPoint}`)
            dispatch('setVictims', victims);
            // let setVictimPoint = new Date().getTime();
            //console.log(`Duration of setting victims: ${setVictimPoint - setSummaryPoint}`)
            dispatch('setTraffickingTypesData', traffickingTypes);
            // let setTraffickPoint = new Date().getTime();
            //console.log(`Duration of setting trafficks: ${setTraffickPoint - setVictimPoint}`)
            /**
             * Bottleneck 1 - 4s+
             */
            dispatch('setInitialMapData', {
                countryOptions: state.options.countryOptions,
                routes,
                coordinates
            });
            // let setMapPoint = new Date().getTime();
            //console.log(`Duration of setting maps: ${setMapPoint - setTraffickPoint}`)
            commit('setIsLoading', false);
            // let end = new Date().getTime();
            //console.log(`Duration of setting variables: ${end - pointFour}`)
            //console.log(`Total time spent: ${end - start}`)
        },

        updateFilteredData({
            commit,
            state,
            dispatch
        }, data) {
            commit('setIsLoading', true);
            //console.log('loading starts')
            commit('setFilteredRoutes', data)
            // dispatch('setOptions', data)
            dispatch('setSummaryData', data.length)

            let victims = data.map(route => route.victims);
            victims = victims.flat()
            victims = victims.filter(victim => victim !== null);

            let traffickingTypes = data.map(route => route.traffick_type.map(type => type.type));
            traffickingTypes = traffickingTypes.flat()
            traffickingTypes = traffickingTypes.filter(type => type !== null)

            let countries = data.map(route => route.ctry);
            countries = countries.flat()
            countries = countries.filter(country => country !== null && country !== '')

            let countryOptions = [...new Set(countries)]

            /** trafficking sub type options */
            let typeArray = data.map(route => route.traffick_type).flat()
            typeArray = typeArray.filter(type => state.filters.selectedTraffickingTypes.includes(type.type))
            typeArray = typeArray.map(type => type.subtype)
            // let subTypeOptions = routes.map(route => route.traffick_type.map(type => type.subtype))
            // subTypeOptions = [].concat(...subTypeOptions);
            let subTypeOptions = [...new Set(typeArray)].filter(type => type !== null).sort()
            //console.log(subTypeOptions)
            commit('setTraffickingSubTypeOptions', subTypeOptions)

            dispatch('setVictims', victims);
            dispatch('setTraffickingTypesData', traffickingTypes);
            dispatch('setInitialMapData', {
                countryOptions,
                routes: data,
                coordinates: state.data.coordinates
            });
            commit('setIsLoading', false);
            //console.log('loading done')
        }

    }
});

export default store;
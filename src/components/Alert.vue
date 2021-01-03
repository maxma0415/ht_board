<template>
<b-notification
            type="is-danger"
            has-icon
            aria-close-label="Close notification"
            role="alert">
            {{authError}}
        </b-notification>
</template>

<script>
export default {
    props: {
        authError: {
            type: String,
        },
    },
    methods: {
    }
}
</script>
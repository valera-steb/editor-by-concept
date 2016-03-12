/**
 * Created by steb on 12.03.2016.
 */
define([], function () {

    var st = {
        hasNumber: function (d) {
            var t = d ? d.trim().match(/^\d+/) : null;

            return t ? Number(t) : null;
        },

        hasOuts: function (d) {
            var t = d ? d.split(',') : null;

            return t ? t.map(function (i) {
                var hasN = st.hasNumber(i);

                if (hasN == null)
                    throw new Error(i);

                return hasN;
            }) : null;
        },

        hasDefinitionPart: function (d) {
            var x = d ? d.match(/-((\d+,?)+)$/) : null;

            return x && x.length ? x[1] : null;
        },

        hasDefinition: function (d) {
            var
                num = st.hasNumber(d),
                outsDef = st.hasDefinitionPart(d),
                outs = st.hasOuts(outsDef);

            if (num == null)
                throw new Error(d);

            var r = {name: num};
            if (outs != null)
                r.outs = outs;

            return r;
        }
    };

    return function extract(d) {
        var
            points = d.split(/\| +/);

        return points.map(st.hasDefinition);
    }
});

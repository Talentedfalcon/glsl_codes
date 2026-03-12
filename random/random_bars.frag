#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}
float random(float num){
    return fract(sin(num)*43758.5453123);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    st.x*=u_resolution.x/u_resolution.y;
    vec3 color=vec3(0.);

    st*=vec2(100.,2.);

    vec2 translate=vec2(u_time*10.,0.);
    if(st.y>1.){
        st-=translate;
        vec2 ipos=floor(st);
        color=vec3(
            step(
                random(ipos),
                random(floor(sin(u_time/10.)*20.))
            ));
    }
    else{
        st+=translate;    
        vec2 ipos=floor(st);
        color=vec3(
            step(
                random(ipos),
                random(ceil(cos(u_time/10.)*20.))
            ));
    }

    gl_FragColor=vec4(color,1.);
}
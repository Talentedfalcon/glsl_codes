#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 circle(vec2 st, float radius, float thickness){
    float point=pow(st.x-0.5,2.)+pow(st.y-0.5,2.);
    if(point<=pow(radius,2.) && point>=pow(radius-thickness,2.)){
        return vec3(0.0,0.5,0.8);
    }
    return vec3(1.,1.,1.);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;

    vec3 colorA=vec3(1.,0.5,0.);
    vec3 colorB=vec3(1.,1.,1.);
    vec3 colorC=vec3(0.,1.,0.);

    vec3 c=circle(st,0.1,0.008);

    float percent=step(st.y,0.6667);

    vec3 color=mix(colorA,colorB,percent);
    color=mix(color,colorC,step(st.y,0.3334));
    color*=c;

    gl_FragColor=vec4(color,1.);
}
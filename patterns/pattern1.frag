#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(vec2 st, float radius){
    st=st-vec2(0.5);
    return 1.-smoothstep(radius-(radius*0.01),
                        radius+(radius*0.01),
                        dot(st,st)*4.0);
}

//scale=(col,row)
vec2 tile(vec2 st,vec2 scale){
    st*=scale;
    st=fract(st);
    return st;
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution;
    vec3 color=vec3(0.0);
    st=tile(st,vec2(3.));
    color=vec3(0.0,st.x,st.y);
    color*=vec3(circle(st,0.5*fract(u_time)));
    gl_FragColor=vec4(color,1.0);
}
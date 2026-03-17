#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st){
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

float noise(vec2 st){
    vec2 ipos=floor(st);
    vec2 fpos=fract(st);

    float a=random(ipos);
    float b=random(ipos+vec2(1.,0.));
    float c=random(ipos+vec2(0.,1.));
    float d=random(ipos+vec2(1.,1.));

    vec2 u=smoothstep(0.,1.,fpos);
    //2D Interpolation using smoothstep instead of linear
    return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}

vec2 tile(vec2 st,vec2 scale){
    st*=scale;
    return fract(st);
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution.xy;
    st.x*=u_resolution.x/u_resolution.y;
    vec2 mouse_correct=u_mouse.xy/u_resolution.xy;
    vec3 color=vec3(0.);

    st*=vec2(100.,100.);
    float r=noise(st);
    float g=noise(st);
    float b=noise(st);
    
    color=vec3(step(r,mouse_correct.x),step(g,0.3),step(b,mouse_correct.y));

    gl_FragColor=vec4(color,1.0);
}